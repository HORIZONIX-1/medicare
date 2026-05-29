"use client";

import { useReactToPrint }
  from "react-to-print";

import jsPDF from "jspdf";

import html2canvas
  from "html2canvas";

interface Props {
  printRef: any;
}

export default function InvoicePDFButtons({
  printRef,
}: Props) {

  // PRINT

  const handlePrint =
    useReactToPrint({
      contentRef: printRef,
    });

  // DOWNLOAD PDF

  const downloadPDF =
    async () => {
    try {
      const element =
        printRef.current;

      if (!element) {
        throw new Error("Invoice preview is not ready yet.");
      }

      const canvas =
        await html2canvas(
          element
        );

      if (!canvas.width || !canvas.height) {
        throw new Error("Unable to render the invoice for PDF download.");
      }

      const data =
        canvas.toDataURL("image/png");

      const pdf =
        new jsPDF({
          orientation: "portrait",

          unit: "px",

          format: "a4",
        });

      const imgWidth = 595;

      const pageHeight = 842;

      const imgHeight =
        (canvas.height * imgWidth)
        / canvas.width;

      pdf.addImage(
        data,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );

      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Failed to generate invoice PDF:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate invoice PDF.";

      window.alert(message);
    }
  };

  return (
    <div className="flex gap-4">

      <button
        onClick={handlePrint}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Print Invoice
      </button>

      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Download PDF
      </button>

    </div>
  );
}