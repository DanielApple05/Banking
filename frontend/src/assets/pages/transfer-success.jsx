import { CheckCircle, ArrowUpRight, Home, ReceiptText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TransferSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const amount        = state?.amount ?? 0;
  const currency      = state?.currency ?? 'NGN';
  const recipient     = state?.recipient ?? 'Recipient';
  const bank          = state?.bank ?? '';
  const transactionId = state?.transactionId ?? '';
  const now           = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center max-w-md mx-auto px-5">

      {/* Success Icon */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-40 h-40 rounded-full bg-green-50" />
        <div className="absolute w-28 h-28 rounded-full bg-green-100" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Transfer Successful!</h1>
      <p className="text-sm text-gray-400 text-center mb-2">
        Your transfer has been processed successfully.
      </p>

      {/* Amount */}
      <div className="text-4xl font-extrabold text-green-500 mb-1">
        {currency === 'NGN' ? '₦' : '$'}{Number(amount).toLocaleString()}
      </div>
      <p className="text-xs text-gray-400 mb-8">
        Sent to <span className="font-semibold text-gray-600">{recipient}{bank ? ` • ${bank}` : ''}</span>
      </p>

      {/* Summary pill */}
      <div className="w-full bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-col gap-3 mb-8">
        {[
          { label: "Transaction ID", value: transactionId ? `#${transactionId.slice(-8).toUpperCase()}` : '—' },
          { label: "Date & Time",    value: now },
          { label: "Transfer Fee",   value: "₦0.00" },
          { label: "Status",         value: "Successful", green: true },
        ].map((row, i, arr) => (
          <div key={row.label} className={`flex items-center justify-between ${i < arr.length - 1 ? "border-b border-gray-100 pb-3" : ""}`}>
            <span className="text-sm text-gray-400">{row.label}</span>
            <span className={`text-sm font-bold ${row.green ? "text-green-500" : "text-gray-900"}`}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate("/transfer")}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-2xl transition text-base mb-3"
      >
        <ArrowUpRight className="w-5 h-5" />
        Make Another Transfer
      </button>

      <button
        onClick={() => navigate("/transactions")}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl transition text-base mb-3"
      >
        <ReceiptText className="w-5 h-5 text-blue-500" />
        View Transaction
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1 text-blue-600 font-semibold text-sm py-2 hover:underline transition"
      >
        <Home className="w-4 h-4" /> Back to Home
      </button>
    </div>
  );
}

export default TransferSuccess;
