// exportHtmlToWord.js
// Word export using html2canvas (like PDF export) - captures visual content as image
import html2canvas from "html2canvas";
import htmlDocx from "html-docx-js/dist/html-docx";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { saveAs } from "file-saver";

/**
 * Utility: Convert px to pt (1px ≈ 0.75pt)
 */
const pxToPt = (px) => {
  if (!px && px !== 0) return "0pt";
  const num = parseFloat(String(px).replace("px", ""));
  if (Number.isNaN(num)) return "0pt";
  return `${(num * 0.75).toFixed(2)}pt`;
};

/**
 * Utility: Normalize border for Word (pt units + mso fallback)
 */
const normalizeBorder = (widthPx = "1px", style = "solid", color = "#000000") => {
  const widthPt = pxToPt(widthPx);
  const cssBorder = `${widthPt} ${style} ${color}`;
  const msoBorder = `mso-border-alt: single ${color} ${widthPt}`;
  return `${cssBorder}; ${msoBorder};`;
};

/**
 * Utility: Extract safe text content (no HTML tags, trimmed)
 */
const safeText = (node) => {
  if (!node) return "";
  const text = node.innerText || node.textContent || "";
  return text.replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
};

/**
 * Utility: Extract clean HTML from element (preserve only Word-safe tags)
 */
const extractCleanHtml = (element) => {
  if (!element) return "&nbsp;";
  
  const allowedTags = ["B", "STRONG", "EM", "I", "U", "BR", "P", "SPAN", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6"];
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return NodeFilter.FILTER_ACCEPT;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          return allowedTags.includes(node.nodeName) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    },
    false
  );

  let html = "";
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\s+/g, " ");
      if (text.trim()) html += text;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.nodeName.toLowerCase();
      if (tagName === "br") {
        html += "<br/>";
      } else if (tagName === "p") {
        html += `<p>${safeText(node)}</p>`;
      } else if (tagName === "strong" || tagName === "b") {
        html += `<strong>${safeText(node)}</strong>`;
      } else if (tagName === "em" || tagName === "i") {
        html += `<em>${safeText(node)}</em>`;
      } else if (tagName === "ul" || tagName === "ol") {
        const items = Array.from(node.querySelectorAll("li")).map(li => `<li>${safeText(li)}</li>`).join("");
        html += `<${tagName}>${items}</${tagName}>`;
      } else if (tagName === "li") {
        html += `<li>${safeText(node)}</li>`;
      } else if (tagName.startsWith("h")) {
        html += `<${tagName}>${safeText(node)}</${tagName}>`;
      } else {
        html += safeText(node);
      }
    }
  }
  
  return html || "&nbsp;";
};

/**
 * Snapshot element to PNG dataURL (for rotated/transformed elements)
 */
const snapshotElement = async (element, scale = 2) => {
  try {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });
    return canvas.toDataURL("image/png");
  } catch (err) {
    console.warn("Snapshot failed:", err);
    return null;
  }
};

/**
 * Build table HTML from Column/Row structure
 */
const buildTableFromColumns = async (parentElement, options = {}) => {
  const columns = Array.from(parentElement.children).filter(
    (child) => child.nodeType === Node.ELEMENT_NODE
  );

  if (columns.length <= 1) return null;

  // Calculate column widths as percentages
  const parentWidth = parentElement.getBoundingClientRect().width;
  const columnWidths = [];
  if (parentWidth > 0) {
    columns.forEach((col) => {
      const width = col.getBoundingClientRect().width;
      const percent = Math.round((width / parentWidth) * 100);
      columnWidths.push(Math.max(1, percent));
    });
    // Normalize to sum to 100
    const sum = columnWidths.reduce((a, b) => a + b, 0);
    if (sum !== 100 && sum > 0) {
      columnWidths.forEach((w, i) => {
        columnWidths[i] = Math.round((w / sum) * 100);
      });
    }
  }

  // Gather rows per column
  const rowsPerColumn = columns.map((col) =>
    Array.from(col.children).filter((child) => child.nodeType === Node.ELEMENT_NODE)
  );
  const maxRows = Math.max(...rowsPerColumn.map((rows) => rows.length), 0);

  if (maxRows === 0) return null;

  // Build table HTML
  let tableHtml = `<table style="border-collapse: collapse; border-spacing: 0; width: 100%; border: ${normalizeBorder("2px", "solid", "#000000")}">`;

  for (let rowIdx = 0; rowIdx < maxRows; rowIdx++) {
    tableHtml += "<tr>";

    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const rowElement = rowsPerColumn[colIdx][rowIdx];
      let cellContent = "&nbsp;";

      if (rowElement) {
        // Check if element has transform/rotation
        const computedStyle = window.getComputedStyle(rowElement);
        const hasTransform = computedStyle.transform && computedStyle.transform !== "none";

        if (hasTransform && options.snapshotRotated) {
          // Snapshot rotated element as image
          const dataUrl = await snapshotElement(rowElement, options.snapshotScale || 2);
          if (dataUrl) {
            const rect = rowElement.getBoundingClientRect();
            cellContent = `<img src="${dataUrl}" style="display: block; width: ${rect.width}px; height: ${rect.height}px;" alt="" />`;
          } else {
            cellContent = safeText(rowElement) || "&nbsp;";
          }
        } else {
          // Extract clean HTML content
          cellContent = extractCleanHtml(rowElement);
        }
      }

      // Build TD with inline styles
      const widthStyle = columnWidths[colIdx] ? `width: ${columnWidths[colIdx]}%;` : "";
      const cellStyle = `${widthStyle} border: ${normalizeBorder("1.5px", "solid", "#000000")}; padding: ${pxToPt("6px")}; vertical-align: top;`;
      tableHtml += `<td style="${cellStyle}">${cellContent}</td>`;
    }

    tableHtml += "</tr>";
  }

  tableHtml += "</table>";
  return tableHtml;
};

/**
 * Build complete Word-friendly HTML from contentRef
 */
const buildWordFriendlyHtml = async (rootElement, options = {}) => {
  if (!rootElement) {
    console.error("buildWordFriendlyHtml: rootElement is null");
    return "";
  }

  console.log("Building HTML from element:", rootElement);
  const parts = [];

  // Extract logo/image if present
  const logo = rootElement.querySelector("img");
  if (logo && logo.src) {
    let logoSrc = logo.src;
    // If base64 is too large, snapshot it
    if (logoSrc.startsWith("data:") && logoSrc.length > 500000) {
      const snapshot = await snapshotElement(logo, 2);
      if (snapshot) logoSrc = snapshot;
    }
    if (logoSrc) {
      const logoStyle = `width: 120px; height: auto; display: block; margin: 0 auto ${pxToPt("10px")};`;
      parts.push(`<div style="text-align: center;"><img src="${logoSrc}" style="${logoStyle}" alt="" /></div>`);
    }
  }

  // Extract headings
  const headings = rootElement.querySelectorAll("h1, h2");
  console.log(`Found ${headings.length} headings`);
  headings.forEach((heading) => {
    const text = safeText(heading);
    if (text) {
      const fontSize = pxToPt(window.getComputedStyle(heading).fontSize || "24px");
      const headingStyle = `text-align: center; font-size: ${fontSize}; font-weight: 600; margin-bottom: ${pxToPt("8px")}; font-family: Arial, Helvetica, sans-serif;`;
      parts.push(`<div style="${headingStyle}">${text}</div>`);
    }
  });

  // Process main content blocks - look for divs with class "mb-8" or similar content containers
  const mainChildren = Array.from(rootElement.children).filter(
    (child) => child.nodeType === Node.ELEMENT_NODE
  );

  console.log(`Processing ${mainChildren.length} main children`);

  for (const child of mainChildren) {
    // Skip if already processed (logo, headings)
    if (child.tagName === "IMG" || (child.tagName === "H1" || child.tagName === "H2")) {
      continue;
    }

    // Check if this is a Column/Row structure
    const directChildren = Array.from(child.children).filter(
      (ch) => ch.nodeType === Node.ELEMENT_NODE
    );

    console.log(`Child ${child.tagName} has ${directChildren.length} direct children`);

    const hasColumnStructure = directChildren.length > 1 && 
      directChildren.some((dc) => dc.children.length > 0);

    if (hasColumnStructure) {
      // Try to build table from columns
      console.log("Building table from columns...");
      const tableHtml = await buildTableFromColumns(child, options);
      if (tableHtml) {
        console.log("Table built successfully, length:", tableHtml.length);
        parts.push(tableHtml);
        continue;
      } else {
        console.log("Table build returned null, falling through to other handlers");
      }
    }

    // Check for lists
    const lists = child.querySelectorAll("ul, ol");
    if (lists.length > 0) {
      console.log(`Found ${lists.length} lists`);
      lists.forEach((list) => {
        const items = Array.from(list.querySelectorAll("li"))
          .map((li) => `<li style="margin: ${pxToPt("4px")} 0;">${safeText(li)}</li>`)
          .join("");
        const listTag = list.tagName.toLowerCase();
        const listStyle = `margin: ${pxToPt("6px")} 0 ${pxToPt("6px")} ${pxToPt("18px")};`;
        parts.push(`<${listTag} style="${listStyle}">${items}</${listTag}>`);
      });
      continue;
    }

    // Check for nested Column/Row structures (recursive)
    const nestedColumns = child.querySelectorAll("div.flex, div[class*='flex']");
    if (nestedColumns.length > 0) {
      // Try to process nested column structures
      for (const nestedCol of nestedColumns) {
        const nestedChildren = Array.from(nestedCol.children).filter(
          (ch) => ch.nodeType === Node.ELEMENT_NODE
        );
        if (nestedChildren.length > 1) {
          const nestedTable = await buildTableFromColumns(nestedCol, options);
          if (nestedTable) {
            parts.push(nestedTable);
            continue;
          }
        }
      }
    }

    // Check for paragraphs or text blocks
    const text = safeText(child);
    if (text && text.length > 0 && text.trim() !== "") {
      console.log("Adding text block:", text.substring(0, 50));
      const fontSize = pxToPt(window.getComputedStyle(child).fontSize || "12px");
      const fontWeight = window.getComputedStyle(child).fontWeight || "normal";
      const paragraphStyle = `font-size: ${fontSize}; font-weight: ${fontWeight}; margin: ${pxToPt("4px")} 0; font-family: Arial, Helvetica, sans-serif;`;
      parts.push(`<p style="${paragraphStyle}">${text}</p>`);
    } else {
      // If no direct text, try to extract from all nested elements
      const allText = child.innerText || child.textContent || "";
      if (allText && allText.trim().length > 0) {
        console.log("Adding nested text block:", allText.substring(0, 50));
        const fontSize = pxToPt(window.getComputedStyle(child).fontSize || "12px");
        const paragraphStyle = `font-size: ${fontSize}; margin: ${pxToPt("4px")} 0; font-family: Arial, Helvetica, sans-serif;`;
        // Preserve line breaks
        const formattedText = allText.replace(/\n/g, "<br/>");
        parts.push(`<p style="${paragraphStyle}">${formattedText}</p>`);
      }
    }
  }

  // Extract footer if present
  const footer = rootElement.querySelector(".font-bold, footer, [class*='footer']");
  if (footer) {
    const footerText = safeText(footer);
    if (footerText) {
      const footerStyle = `font-weight: 700; margin-top: ${pxToPt("8px")}; font-family: Arial, Helvetica, sans-serif;`;
      parts.push(`<p style="${footerStyle}">${footerText}</p>`);
    }
  }

  const result = parts.join("");
  console.log(`Generated HTML length: ${result.length}, parts count: ${parts.length}`);
  return result;
};

/**
 * Wrap HTML with CodexWorld Word document structure
 */
const wrapWordDocument = (htmlContent) => {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, Helvetica, sans-serif; }
    table { border-collapse: collapse; border-spacing: 0; }
    td, th { padding: 4pt; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
};

/**
 * Main export function - uses html2canvas like PDF export
 * @param {React.RefObject|HTMLElement} contentRef - React ref or DOM element
 * @param {string} filename - Base filename (without extension)
 * @param {object} options - Export options
 * @param {boolean} options.useDocx - Use .docx format (default: true)
 * @param {number} options.scale - html2canvas scale (default: 2)
 * @param {boolean} options.useImage - Use image-based export (default: true, like PDF)
 * @param {boolean} options.useHtml - Use HTML-based export (default: false)
 */
export const exportHtmlToWord = async (
  contentRef,
  filename = "ServiceVoucher",
  options = {}
) => {
  const {
    useDocx = true,
    scale = 2,
    useImage = true,
    useHtml = false,
  } = options;

  // Get root element
  let rootElement;
  if (contentRef && contentRef.current) {
    rootElement = contentRef.current;
  } else if (contentRef && contentRef.nodeType) {
    rootElement = contentRef;
  } else {
    console.error("exportHtmlToWord: Invalid contentRef");
    return;
  }

  if (!rootElement) {
    console.error("exportHtmlToWord: Root element not found");
    return;
  }

  try {
    // Save original overflow
    const originalOverflow = rootElement.style.overflow;
    rootElement.style.overflow = "visible";

    if (useImage) {
      // Image-based approach (like PDF export) - captures everything visually
      console.log("Capturing content with html2canvas...");
      
      const canvas = await html2canvas(rootElement, {
        scale,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false,
      });

      // Convert canvas to PNG data URL
      const dataUrl = canvas.toDataURL("image/png");
      
      // Convert base64 to ArrayBuffer
      const base64 = dataUrl.split(",")[1];
      const byteString = atob(base64);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i);
      }

      // Calculate display dimensions (divide by scale to get actual size)
      const displayWidthPx = Math.round(canvas.width / scale);
      const displayHeightPx = Math.round(canvas.height / scale);

      // Convert pixels to EMUs (1 inch = 914400 EMUs, at 96 DPI: 1px = 9525 EMUs)
      const PIXELS_TO_EMUS = 9525;
      const widthEmus = Math.round(displayWidthPx * PIXELS_TO_EMUS);
      const heightEmus = Math.round(displayHeightPx * PIXELS_TO_EMUS);

      console.log(`Image dimensions: ${displayWidthPx}x${displayHeightPx}px = ${widthEmus}x${heightEmus} EMUs`);

      // Create ImageRun
      const image = new ImageRun({
        type: "png",
        data: arrayBuffer,
        transformation: {
          width: widthEmus,
          height: heightEmus,
        },
      });

      // Build Word document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [new Paragraph({ children: [image] })],
          },
        ],
      });

      // Restore overflow
      rootElement.style.overflow = originalOverflow;

      // Export
      if (useDocx) {
        console.log("Exporting as .docx...");
        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${filename}.docx`);
        console.log("Exported:", `${filename}.docx`);
      } else {
        // For .doc, we'd need to use html-docx-js with an HTML wrapper containing the image
        console.log("Exporting as .doc...");
        const htmlWithImage = wrapWordDocument(`<img src="${dataUrl}" style="width: 100%; height: auto;" alt="" />`);
        const docBlob = new Blob([htmlWithImage], {
          type: "application/msword;charset=utf-8",
        });
        saveAs(docBlob, `${filename}.doc`);
        console.log("Exported:", `${filename}.doc`);
      }
    } else if (useHtml) {
      // HTML-based approach (original method)
      console.log("Building Word-friendly HTML...");
      const cleanHtml = await buildWordFriendlyHtml(rootElement, {
        snapshotRotated: true,
        snapshotScale: scale,
      });

      if (!cleanHtml || cleanHtml.length < 20) {
        console.error("Generated HTML is empty or too short");
        rootElement.style.overflow = originalOverflow;
        return;
      }

      // Wrap with Word document structure
      const finalHtml = wrapWordDocument(cleanHtml);

      // Restore overflow
      rootElement.style.overflow = originalOverflow;

      // Export
      if (useDocx) {
        console.log("Exporting as .docx...");
        const docxBlob = htmlDocx.asBlob(finalHtml);
        saveAs(docxBlob, `${filename}.docx`);
        console.log("Exported:", `${filename}.docx`);
      } else {
        console.log("Exporting as .doc...");
        const docBlob = new Blob([finalHtml], {
          type: "application/msword;charset=utf-8",
        });
        saveAs(docBlob, `${filename}.doc`);
        console.log("Exported:", `${filename}.doc`);
      }
    }
  } catch (err) {
    console.error("exportHtmlToWord error:", err);
    // Restore overflow on error
    if (rootElement) {
      rootElement.style.overflow = originalOverflow;
    }
    throw err;
  }
};

export default exportHtmlToWord;

