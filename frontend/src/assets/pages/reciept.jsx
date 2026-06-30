import React from 'react';
import { useState } from "react";
import {
  ArrowLeft, Download, CheckCircle, XCircle, Share2,
  Landmark, ShieldCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Reciept = () => {
   const navigate = useNavigate();
  const { state } = useLocation();
  const [downloading, setDownloading] = useState(false);

  // Read transaction data passed via navigation state
  const isSuccess      = state?.status !== "Failed";
  const amount         = state?.amount ?? 0;
  const recipient      = state?.recipient ?? "—";
  const accountNumber  = state?.accountNumber ?? "—";
  const bank           = state?.bank ?? "SecureBank";
  const narration      = state?.narration ?? "—";
  const transactionId  = state?.transactionId ?? "N/A";
  const senderName     = JSON.parse(localStorage.getItem("user") || "{}").accountName ?? "—";
  const senderAccount  = JSON.parse(localStorage.getItem("user") || "{}").accountNumber ?? "—";
  const date           = new Date(state?.date || Date.now());

  const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Dynamically load jsPDF from CDN
      if (!window.jspdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 50;
      let y = 60;

      // Header bar
      doc.setFillColor(59, 91, 219); // blue
      doc.rect(0, 0, pageWidth, 90, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("SecureBank", margin, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Transaction Receipt", margin, 70);

      y = 130;
      doc.setTextColor(30, 30, 30);

      // Status badge
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      if (isSuccess) {
        doc.setTextColor(34, 197, 94);
        doc.text("TRANSFER SUCCESSFUL", margin, y);
      } else {
        doc.setTextColor(239, 68, 68);
        doc.text("TRANSFER FAILED", margin, y);
      }
      doc.setTextColor(30, 30, 30);
      y += 35;

      // Amount
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.text(`NGN ${Number(amount).toLocaleString()}`, margin, y);
      y += 40;

      // Divider
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 30;

      const rows = [
        ["Transaction ID", `#${String(transactionId).slice(-10).toUpperCase()}`],
        ["Date", formattedDate],
        ["Time", formattedTime],
        ["Status", isSuccess ? "Successful" : "Failed"],
        ["", ""],
        ["Sender", senderName],
        ["Sender Account", senderAccount],
        ["", ""],
        ["Recipient", recipient],
        ["Recipient Account", accountNumber],
        ["Bank", bank],
        ["", ""],
        ["Narration", narration || "—"],
      ];

      doc.setFontSize(11);
      rows.forEach(([label, value]) => {
        if (!label) { y += 10; return; }
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120, 120, 120);
        doc.text(label, margin, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 30);
        doc.text(String(value), pageWidth - margin, y, { align: "right" });
        y += 24;
      });

      y += 20;
      doc.setDrawColor(230, 230, 230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 30;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("This is a system-generated receipt and does not require a signature.", margin, y);
      y += 16;
      doc.text("For inquiries, contact support@securebank.com", margin, y);

      doc.save(`SecureBank_Receipt_${String(transactionId).slice(-8)}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareText = `SecureBank Transfer Receipt\nAmount: ₦${Number(amount).toLocaleString()}\nTo: ${recipient}\nStatus: ${isSuccess ? "Successful" : "Failed"}\nTransaction ID: #${String(transactionId).slice(-10).toUpperCase()}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "SecureBank Receipt", text: shareText });
      } catch (err) {
        // user cancelled share, ignore
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Receipt details copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Receipt</h1>
        <button onClick={handleShare} className="p-2 rounded-full hover:bg-gray-100 transition">
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* Receipt Card */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">

          {/* Top — Bank header */}
          <div
            className="relative px-6 py-6"
            style={{ background: "linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 60%, #748ffc 100%)" }}
          >
            <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 60" preserveAspectRatio="none">
              <path d="M0,30 C100,60 300,0 400,30 L400,60 L0,60 Z" fill="white" />
            </svg>
            <div className="relative z-10 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-white" />
              <span className="text-white font-extrabold text-base">SecureBank</span>
            </div>
            <p className="relative z-10 text-blue-100 text-xs mt-1">Transaction Receipt</p>
          </div>

          {/* Status + Amount */}
          <div className="flex flex-col items-center px-6 py-7 border-b border-dashed border-gray-200">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${isSuccess ? "bg-green-100" : "bg-red-100"}`}>
              {isSuccess
                ? <CheckCircle className="w-7 h-7 text-green-500" />
                : <XCircle className="w-7 h-7 text-red-500" />}
            </div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
              {isSuccess ? "Transfer Successful" : "Transfer Failed"}
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              ₦{Number(amount).toLocaleString()}
            </p>
          </div>

          {/* Details */}
          <div className="px-6 py-5 flex flex-col gap-3">
            {[
              { label: "Transaction ID", value: `#${String(transactionId).slice(-10).toUpperCase()}` },
              { label: "Date", value: formattedDate },
              { label: "Time", value: formattedTime },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-xs font-bold text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Sender / Recipient */}
          <div className="px-6 py-5 border-t border-dashed border-gray-200 flex flex-col gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">From</p>
              <p className="text-sm font-bold text-gray-900">{senderName}</p>
              <p className="text-xs text-gray-400">**** {senderAccount.slice ? senderAccount.slice(-4) : senderAccount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">To</p>
              <p className="text-sm font-bold text-gray-900">{recipient}</p>
              <p className="text-xs text-gray-400">**** {accountNumber.slice ? accountNumber.slice(-4) : accountNumber} • {bank}</p>
            </div>
            {narration && narration !== "—" && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Narration</p>
                <p className="text-sm font-semibold text-gray-700">{narration}</p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-gray-50 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-300 shrink-0" />
            <p className="text-xs text-gray-400">This receipt is system-generated and does not require a signature.</p>
          </div>
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition text-base mb-3 text-white
            ${downloading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"}`}
        >
          <Download className="w-5 h-5" />
          {downloading ? "Generating PDF..." : "Download Receipt (PDF)"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-center text-blue-600 font-semibold text-sm py-2 hover:underline transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Reciept;
