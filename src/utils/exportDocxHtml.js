// exportDocxHtml.js
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

/**
 * Utility helpers
 */
const pxToPtValue = (pxNum) => pxNum * 0.75; // approx
const pxToPt = (pxStr) => {
  if (!pxStr) return pxStr;
  const n = parseFloat(String(pxStr).replace("px", ""));
  return Number.isNaN(n) ? pxStr : `${pxToPtValue(n).toFixed(2)}pt`;
};
const normalizeBorderForWord = (widthPx = "1px", style = "solid", color = "#000") => {
  const pt = pxToPt(widthPx);
  const css = `${pt} ${style} ${color}`;
  const mso = `mso-border-alt: single ${color} ${pt};`;
  return `${css}; ${mso}`;
};
const safeText = (node) => {
  // returns plain text, trimming weird whitespace
  if (!node) return "";
  return (node.innerText || node.textContent || "").replace(/\u00A0/g, " ").trim();
};
const shortId = (() => {
  let i = 0;
  return (prefix = "id") => `${prefix}-${Date.now()}-${++i}`;
})();

/**
 * Snapshot an element from the live page to PNG dataURL.
 * Used only for transformed / rotated elements which Word can't render from HTML.
 */
const snapshotElementToDataUrl = async (el, scale = 2) => {
  try {
    const canvas = await html2canvas(el, { scale, useCORS: true, logging: false });
    return canvas.toDataURL("image/png");
  } catch (e) {
    console.warn("snapshot failed", e);
    return null;
  }
};

/**
 * Build a clean <table> HTML string from a "columns-of-rows" DOM block (best-effort).
 * We examine a parent element whose direct children are columns; each column's direct children are rows.
 * We will produce <table> with rows = maxRows and columns = number of columns.
 */
const buildTableFromColumns = async (parentEl, options = {}) => {
  const cols = Array.from(parentEl.children).filter((c) => c.nodeType === 1);
  if (cols.length <= 1) return null;

  // compute widths (percent) by measuring live DOM widths on screen if possible
  const totalWidth = parentEl.getBoundingClientRect().width || null;
  let percentWidths = null;
  if (totalWidth && cols.length > 0) {
    percentWidths = cols.map((c) =>
      Math.max(1, Math.round((c.getBoundingClientRect().width / totalWidth) * 100))
    );
    // ensure sum ~100 (simple adjust)
    const sum = percentWidths.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      percentWidths = percentWidths.map((w) => Math.round((w / sum) * 100));
    }
  }

  // gather rows per column
  const rowsPerCol = cols.map((c) => Array.from(c.children).filter((cn) => cn.nodeType === 1));
  const maxRows = Math.max(...rowsPerCol.map((r) => r.length), 0);
  if (maxRows === 0) return null;

  // build html
  let tableHtml = `<table style="border-collapse:collapse; border-spacing:0; width:100%; border: ${normalizeBorderForWord("2px", "solid", "#000")}">`;

  for (let r = 0; r < maxRows; r++) {
    tableHtml += "<tr>";
    for (let cIdx = 0; cIdx < cols.length; cIdx++) {
      const cellSource = rowsPerCol[cIdx][r];
      // fallback to non-breaking space if missing
      let innerHtml = "&nbsp;";
      if (cellSource) {
        // if the source has a transform, snapshot the original element as image and embed
        const cs = window.getComputedStyle(cellSource);
        if (cs && cs.transform && cs.transform !== "none") {
          // attempt to find the original live element in the page (best-effort)
          // here parentEl is clone-less (we operate on live DOM), so cellSource is already live
          // snapshot and embed
          const dataUrl = await snapshotElementToDataUrl(cellSource, options.snapshotScale || 2);
          if (dataUrl) {
            innerHtml = `<img src="${dataUrl}" style="display:block; width:${cellSource.getBoundingClientRect().width}px; height:${cellSource.getBoundingClientRect().height}px;" alt="rotated" />`;
          } else {
            innerHtml = safeText(cellSource) || "&nbsp;";
          }
        } else {
          // Build minimal inner HTML by preserving basic tags: strong, b, em, br, and plain text.
          // Avoid Tailwind classes and scripts.
          // We'll transform child nodes to a safe string.
          const allowedTags = ["B", "STRONG", "EM", "BR", "SPAN", "P", "UL", "OL", "LI"];
          const walker = document.createTreeWalker(cellSource, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
          const fragments = [];
          let node;
          while ((node = walker.nextNode())) {
            if (node.nodeType === Node.TEXT_NODE) {
              fragments.push(node.textContent.replace(/\s+/g, " "));
            } else if (allowedTags.includes(node.nodeName)) {
              if (node.nodeName === "BR") fragments.push("<br/>");
              else if (node.nodeName === "B" || node.nodeName === "STRONG") fragments.push(`<strong>${node.innerText}</strong>`);
              else if (node.nodeName === "EM") fragments.push(`<em>${node.innerText}</em>`);
              else if (node.nodeName === "LI") fragments.push(`<li>${node.innerText}</li>`);
              else if (node.nodeName === "UL") fragments.push(`<ul>${Array.from(node.children).map(ch => `<li>${ch.innerText}</li>`).join("")}</ul>`);
              else if (node.nodeName === "OL") fragments.push(`<ol>${Array.from(node.children).map(ch => `<li>${ch.innerText}</li>`).join("")}</ol>`);
              else fragments.push(node.innerText);
            } else {
              // For other nodes, capture simple text
              // Do not include child markup (to avoid nested Tailwind classes)
            }
          }
          const text = fragments.join(" ").trim();
          innerHtml = text ? text : (cellSource.innerText ? cellSource.innerText : "&nbsp;");
          // convert newlines to <br>
          innerHtml = innerHtml.replace(/\n/g, "<br/>");
        }
      }

      // build td with inline style
      const widthStyle = percentWidths && percentWidths[cIdx] ? `width:${percentWidths[cIdx]}%;` : "";
      const tdStyle =
        `${widthStyle} border: ${normalizeBorderForWord("1.5px", "solid", "#000")}; padding: ${pxToPt("6px")}; vertical-align: top;`;
      tableHtml += `<td style="${tdStyle}">${innerHtml}</td>`;
    } // end columns
    tableHtml += "</tr>";
  } // end rows

  tableHtml += "</table>";
  return tableHtml;
};

/**
 * Build the whole document's user-friendly HTML by walking important blocks inside contentRef
 * This function is intentionally conservative: it will only convert Column/Row blocks to tables,
 * and for other nodes it will output readable HTML paragraphs preserving basic inline text.
 */
const buildWordFriendlyHtml = async (contentRef, options = {}) => {
  const root = contentRef;
  if (!root) return "";

  const parts = [];

  // Optional: an image/header if present (logo)
  const logo = root.querySelector("img");
  if (logo && logo.src) {
    // avoid embedding extremely large base64 images
    let src = logo.src;
    if (src.startsWith("data:") && src.length > 500000) {
      // scale down by snapshotting
      const dataUrl = await snapshotElementToDataUrl(logo, options.snapshotScale || 2);
      src = dataUrl || "";
    }
    if (src) parts.push(`<div style="text-align:center;"><img src="${src}" style="width:120px;height:auto;display:inline-block;"/></div>`);
  }

  // Titles / headings: find first H1/H2 inside root
  const h1 = root.querySelector("h1");
  if (h1) {
    const txt = safeText(h1);
    parts.push(`<div style="text-align:center; font-size:${pxToPt(window.getComputedStyle(h1).fontSize)}; font-weight:600; margin-bottom:${pxToPt("8px")};">${txt}</div>`);
  }
  const h1b = Array.from(root.querySelectorAll("h1")).slice(1);
  if (h1b && h1b.length > 0) {
    h1b.forEach((h) => parts.push(`<div style="text-align:center; font-size:${pxToPt(window.getComputedStyle(h).fontSize)}; font-weight:600;">${safeText(h)}</div>`));
  }

  // Now iterate children of root and handle Column groups and other blocks
  const children = Array.from(root.children);
  for (const child of children) {
    // detect column-group: a container with multiple direct children that themselves have direct children
    const directChildren = Array.from(child.children).filter((ch) => ch.nodeType === 1);
    const candidateColumns = directChildren.length > 1 && directChildren.filter((c) => c.children.length > 0).length >= 1;
    if (candidateColumns) {
      // build a table from this group
      const tableHtml = await buildTableFromColumns(child, options);
      if (tableHtml) {
        parts.push(tableHtml);
        continue;
      }
    }

    // fallback: simple paragraph or list
    // Preserve <ul>/<ol> inside child
    if (child.querySelectorAll && child.querySelectorAll("li").length > 0) {
      const lis = Array.from(child.querySelectorAll("li")).map((li) => `<li>${safeText(li)}</li>`).join("");
      parts.push(`<ul style="margin:6pt 0 6pt 18pt;">${lis}</ul>`);
      continue;
    }

    // if the block contains many <Row> style lines (e.g., many direct text children), create a small table with 1 column
    if (directChildren.length > 1 && directChildren.every((dc) => (dc.children.length === 0 || dc.children.length === 1))) {
      // single-column table
      let miniTable = `<table style="border-collapse:collapse;border-spacing:0;width:100%;">`;
      directChildren.forEach((dc) => {
        const text = safeText(dc) || "&nbsp;";
        miniTable += `<tr><td style="border: ${normalizeBorderForWord("1.0px", "solid", "#000")}; padding: ${pxToPt("6px")}; vertical-align: top;">${text}</td></tr>`;
      });
      miniTable += `</table>`;
      parts.push(miniTable);
      continue;
    }

    // otherwise, just convert to a paragraph preserving small inline formatting
    const txt = safeText(child);
    if (txt) {
      parts.push(`<p style="font-size:${pxToPt(window.getComputedStyle(child).fontSize || "12px")}; margin:4pt 0;">${txt}</p>`);
    }
  } // end for children

  // Optional: append footer text
  const footer = root.querySelector(".font-bold, .footer, footer");
  if (footer) parts.push(`<p style="font-weight:700; margin-top:8pt;">${safeText(footer)}</p>`);

  // Compose final document HTML
  const wrapped = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>body{font-family:Arial, Helvetica, sans-serif;}</style></head><body>${parts.join("")}</body></html>`;
  return wrapped;
};

/**
 * Main export function
 * usage: handleExportDocxHtml(contentRef.current, "ServiceVoucher.docx")
 */
export const handleExportDocxHtml = async (contentRef, filename = "exported.docx", opts = { snapshotScale: 2, downloadHtml: true }) => {
  if (!contentRef || !contentRef.nodeType && !contentRef.current) {
    console.error("handleExportDocxHtml: invalid contentRef");
    return;
  }
  // support both ref object and raw element
  const rootEl = contentRef.current ? contentRef.current : contentRef;

  try {
    const html = await buildWordFriendlyHtml(rootEl, { snapshotScale: opts.snapshotScale });

    // download intermediate HTML for debug
    if (opts.downloadHtml) {
      const blob = new Blob([html], { type: "text/html" });
      saveAs(blob, "debug-export.html");
    }

    // quickly sanity-check HTML size
    if (!html || html.length < 20) {
      console.error("Generated HTML is empty — aborting");
      return;
    }

    // convert to docx
    const docxBlob = htmlDocx.asBlob(html);
    console.log("docxBlob.size:", docxBlob.size);
    saveAs(docxBlob, filename);
    console.log("Saved docx:", filename);
  } catch (err) {
    console.error("handleExportDocxHtml error:", err);
  }
};

export default handleExportDocxHtml;
