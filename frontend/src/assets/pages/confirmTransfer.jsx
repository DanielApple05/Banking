import { useState, useRef } from "react";
import {
  ArrowLeft,
  Lock,
  User,
  Landmark,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendTransfer } from "../../api/transactions";

const ConfirmTransfer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Read real data from ReviewTransfer
  const recipient = state?.recipient ?? "—";
  const accountNumber = state?.accountNumber ?? "—";
  const bank = state?.bank ?? "—";
  const amount = state?.amount ?? 0;
  const narration = state?.narration ?? "";

  const summaryRows = [
    { label: "Recipient", value: recipient, icon: <User className="w-4 h-4 text-blue-400" />, bg: "bg-blue-50" },
    { label: "Bank", value: bank, icon: <Landmark className="w-4 h-4 text-blue-400" />, bg: "bg-blue-50" },
    { label: "Account Number", value: `**** **** **** ${accountNumber.slice(-4)}`, icon: <CreditCard className="w-4 h-4 text-blue-400" />, bg: "bg-blue-50" },
    { label: "Amount", value: `₦${Number(amount).toLocaleString()}`, icon: <span className="text-green-500 font-bold text-sm">₦</span>, bg: "bg-green-50" },
  ];

  const handlePinChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleConfirm = async () => {

    const pinCode = pin.join("");
    if (pinCode.length !== 4) return;

    setLoading(true);
    setError("");

    try {
      const response = await sendTransfer({
        recipientAccount: accountNumber,
        bank,
        amount,
        narration,
        pin: pinCode,
      });

      if (response.status === 201) {
        navigate("/transfer-success", { state: { transaction: response.data.transaction } });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Transfer failed. Please try again.";
      const status = err.response?.status;

      if (status === 401) {
        // Wrong PIN or PIN not set — stay on page
        setError(message);
        setPin(["", "", "", ""]);
        inputRefs[0].current.focus();
      } else {
        // Insufficient funds or other error — go to failed page
        navigate("/transfer-failed", {
          state: {
            amount,
            recipient,
            bank,
            reason: message,
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const pinFilled = pin.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Confirm Transfer</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 flex flex-col items-center">

        {/* Shield Icon */}
        <div className="relative flex items-center justify-center my-6">
          {/* Decorative dots */}
          <div className="absolute w-36 h-36 rounded-full bg-blue-50" />
          <div className="absolute top-1 right-4 w-2 h-2 rounded-full bg-blue-200" />
          <div className="absolute bottom-2 left-3 w-2 h-2 rounded-full bg-blue-200" />
          <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-blue-100" />
          <div className="relative z-10 w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
          Enter your transaction PIN
        </h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          To complete this transfer, enter your 4-digit PIN.
        </p>

        {/* Summary Card */}
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {summaryRows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center gap-3 px-5 py-4 ${i < summaryRows.length - 1 ? "border-b border-gray-100" : "border-b border-gray-100"}`}
            >
              <div className={`w-8 h-8 rounded-full ${row.bg} flex items-center justify-center shrink-0`}>
                {row.icon}
              </div>
              <span className="flex-1 text-sm text-gray-400">{row.label}</span>
              <span className="text-sm font-bold text-gray-900">{row.value}</span>
            </div>
          ))}
          {/* Total row — no icon, bold label */}
          <div className="flex items-center px-5 py-4">
            <span className="flex-1 text-sm font-extrabold text-gray-900">Total Amount</span>
            <span className="text-sm font-extrabold text-green-500">₦{Number(amount).toLocaleString()}</span>
          </div>
        </div>

        {/* PIN Input */}
        <div className="flex items-center gap-3 mb-4 w-full justify-center">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`w-16 h-16 text-center text-xl font-bold rounded-2xl border-2 outline-none transition bg-white
                ${digit ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-300"}
                focus:border-blue-600 focus:shadow-md`}
              placeholder="•"
            />
          ))}
        </div>

        {/* SSL note */}
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-400">
            This is a secure{" "}
            <span className="text-blue-600 font-semibold">256-bit SSL</span>{" "}
            encrypted transaction.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={pinFilled < 4 || loading}
          className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition text-base mb-3
            ${pinFilled === 4 && !loading
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
              : "bg-blue-300 text-white cursor-not-allowed"}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Confirm Transfer
            </>
          )}
        </button>

        {/* Cancel */}
        <button
          onClick={() => navigate(-1)}
          disabled={loading}
          className="w-full text-center text-blue-600 font-semibold text-sm py-2 hover:underline transition mb-6 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Cancel Transfer
        </button>

        {/* Never share PIN */}
        <div className="flex items-center gap-2 text-gray-300">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs">Never share your PIN with anyone.</span>
        </div>
      </div>
    </div>
  );
}

export default ConfirmTransfer;
