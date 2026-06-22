

 // exportDocxImageMultiPage.js
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { saveAs } from "file-saver";

/**
 * handleExportDocxImageMultiPage
 * - captures the whole DOM node (contentRef.current) as a high-res canvas
 * - slices the canvas vertically into A4-sized chunks and inserts each chunk as a page in docx
 *
 * Usage:
 *   handleExportDocxImageMultiPage(contentRef, { filename: "voucher.docx", scale: 3 });
 */
export const handleExportDocxImage = async (
  contentRef,
  opts = {}
) => {
  const {
    filename = "exported-multipage.docx",
    scale = 3, // increase for sharper images (3 is a good balance)
    pageFormat = "A4", // currently supports only A4 (can be extended)
    dpi = 96, // browser CSS DPI (standard)
  } = opts || {};

  if (!contentRef || !contentRef.current) {
    console.error("handleExportDocxImageMultiPage: missing contentRef");
    return;
  }

  // A4 dimensions in inches
  const PAPER_SIZES_INCH = {
    A4: { widthIn: 8.27, heightIn: 11.69 },
  };

  const paper = PAPER_SIZES_INCH[pageFormat];
  if (!paper) {
    console.error("Unsupported page format:", pageFormat);
    return;
  }

  const el = contentRef.current;

  // Ensure full content is visible to html2canvas
  const origOverflow = el.style.overflow;
  el.style.overflow = "visible";

  // Give browser a tick to apply style
  await new Promise((r) => setTimeout(r, 50));

  // Render full element at requested scale
  const canvas = await html2canvas(el, {
    scale,
    useCORS: true,
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY, // try to capture from top
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  });

  // restore overflow
  el.style.overflow = origOverflow;

  // Canvas full pixel dims (scaled)
  const fullWidthPxScaled = canvas.width;   // = cssWidth * scale
  const fullHeightPxScaled = canvas.height; // = cssHeight * scale

  // Compute page size in CSS pixels at browser DPI, then scale
  const pageWidthCssPx = Math.round(paper.widthIn * dpi);  // e.g. ~794 px for A4 @ 96 DPI
  const pageHeightCssPx = Math.round(paper.heightIn * dpi); // e.g. ~1123 px for A4

  // Page size in *canvas* pixels (accounting for scale)
  const pageWidthPxScaled = pageWidthCssPx * scale;
  const pageHeightPxScaled = pageHeightCssPx * scale;

  // If canvas width differs from desired page width, we'll scale the chunk when inserting into docx.
  // We'll compute the finalImageWidth/Height used for ImageRun as (chunkWidth / scale)
  // which gives CSS-px width that corresponds to Word display size at 96 DPI.

  // Slice canvas into vertical chunks
  const chunks = [];
  let y = 0;
  while (y < fullHeightPxScaled) {
    const sliceHeight = Math.min(pageHeightPxScaled, fullHeightPxScaled - y);
    // create temporary canvas for chunk
    const chunkCanvas = document.createElement("canvas");
    chunkCanvas.width = fullWidthPxScaled;
    chunkCanvas.height = sliceHeight;
    const ctx = chunkCanvas.getContext("2d");
    // draw portion of full canvas onto chunkCanvas
    ctx.drawImage(canvas, 0, y, fullWidthPxScaled, sliceHeight, 0, 0, fullWidthPxScaled, sliceHeight);
    chunks.push(chunkCanvas);
    y += sliceHeight;
  }

  // Build docx sections: one section per chunk so each becomes a separate page
  const sections = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkCanvas = chunks[i];
    // Convert chunk canvas to PNG byte array
    const dataUrl = chunkCanvas.toDataURL("image/png");
    const base64 = dataUrl.split(",")[1];
    const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    // When inserting into docx, set the transformation width/height to CSS pixels (unscaled),
    // i.e., canvas pixels divided by scale. That keeps the physical size approx A4 in Word.
    const finalWidthPx = Math.round(chunkCanvas.width / scale);
    const finalHeightPx = Math.round(chunkCanvas.height / scale);

    const imageRun = new ImageRun({
      data: byteArray,
      transformation: {
        width: finalWidthPx,
        height: finalHeightPx,
      },
    });

    const paragraph = new Paragraph({ children: [imageRun] });

    // Each chunk becomes its own section so Word places it on its own page.
    sections.push({
      properties: {},
      children: [paragraph],
    });
  }

  // Build document with all sections
  const doc = new Document({
    sections,
  });

  const blob = await Packer.toBlob(doc);
  // quick sanity log
  console.log("Exported docx blob size (bytes):", blob.size, "chunks:", chunks.length);
  saveAs(blob, filename);
};
export default handleExportDocxImage;
