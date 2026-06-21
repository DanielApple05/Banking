import { XCircle, RefreshCw, Home, HeadphonesIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TransferFailed = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const amount    = state?.amount ?? 0;
  const currency  = state?.currency ?? 'NGN';
  const recipient = state?.recipient ?? 'Recipient';
  const bank      = state?.bank ?? '';
  const reason    = state?.reason ?? 'Something went wrong.';
  const now       = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center max-w-md mx-auto px-5">

      {/* Failed Icon */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-40 h-40 rounded-full bg-red-50" />
        <div className="absolute w-28 h-28 rounded-full bg-red-100" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
          <XCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Transfer Failed</h1>
      <p className="text-sm text-gray-400 text-center mb-2">
        We couldn't process your transfer. Please try again.
      </p>

      {/* Amount */}
      <div className="text-4xl font-extrabold text-red-500 mb-1">
        {currency === 'NGN' ? '₦' : '$'}{Number(amount).toLocaleString()}
      </div>
      <p className="text-xs text-gray-400 mb-8">
        To <span className="font-semibold text-gray-600">{recipient}{bank ? ` • ${bank}` : ''}</span>
      </p>

      {/* Details card */}
      <div className="w-full bg-white rounded-2xl shadow-sm px-5 py-4 flex flex-col gap-3 mb-6">
        {[
          { label: "Date & Time", value: now },
          { label: "Reason",      value: reason },
          { label: "Status",      value: "Failed", red: true },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            className={`flex items-center justify-between ${i < arr.length - 1 ? "border-b border-gray-100 pb-3" : ""}`}
          >
            <span className="text-sm text-gray-400">{row.label}</span>
            <span className={`text-sm font-bold ${row.red ? "text-red-500" : "text-gray-900"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="w-full bg-red-50 rounded-2xl px-5 py-4 flex items-start gap-3 mb-8">
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <p className="text-xs text-red-400 leading-relaxed">
          No funds have been deducted from your account. If you believe this is an error, please contact support.
        </p>
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate(-1)}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-2xl transition text-base mb-3"
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>

      <button
        onClick={() => alert("Connecting to support...")}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-2xl transition text-base mb-3"
      >
        <HeadphonesIcon className="w-5 h-5 text-blue-500" />
        Contact Support
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

export default TransferFailed;
