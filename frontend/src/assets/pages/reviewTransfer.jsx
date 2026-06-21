import {
  ArrowLeft,
  ShieldCheck,
  User,
  CreditCard,
  Landmark,
  DollarSign,
  FileText,
  Calculator,
  Lock,
  ReceiptText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// In a real app these would come from router state / props
const transferDetails = {
  recipientName: "John Doe",
  accountNumber: "**** **** **** 5678",
  bank: "Zenith Bank PLC",
  amount: "₦20,000.00",
  fee: "₦10.00",
  total: "₦20,010.00",
  narration: "Payment for services",
};

const summaryRows = [
  {
    label: "Recipient Name",
    value: transferDetails.recipientName,
    icon: <User className="w-4 h-4 text-blue-500" />,
    valueClass: "text-gray-900 font-bold",
  },
  {
    label: "Account Number",
    value: transferDetails.accountNumber,
    icon: <CreditCard className="w-4 h-4 text-blue-500" />,
    valueClass: "text-gray-900 font-bold",
  },
  {
    label: "Bank",
    value: transferDetails.bank,
    icon: <Landmark className="w-4 h-4 text-blue-500" />,
    valueClass: "text-gray-900 font-bold",
  },
  {
    label: "Amount",
    value: transferDetails.amount,
    icon: <DollarSign className="w-4 h-4 text-blue-500" />,
    valueClass: "text-gray-900 font-bold",
  },
  {
    label: "Transfer Fee",
    value: transferDetails.fee,
    icon: <ReceiptText className="w-4 h-4 text-blue-500" />,
    valueClass: "text-gray-900 font-bold",
  },
  {
    label: "Total Amount",
    value: transferDetails.total,
    icon: <Calculator className="w-4 h-4 text-green-500" />,
    valueClass: "text-green-500 font-bold",
    last: true,
  },
];

const ReviewTransfer = () => {
   const navigate = useNavigate();

const handleConfirm = () => {
  navigate("/confirm-transfer");
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Review Transfer</h1>
        <div className="w-9" /> {/* spacer to center title */}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 flex flex-col gap-4">

        {/* Info Banner */}
        <div className="flex items-center gap-4 bg-blue-50 rounded-2xl px-4 py-4">
          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-gray-500 leading-snug">
            Please review the details below before confirming your transfer.
          </p>
        </div>

        {/* Transfer Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm font-extrabold text-gray-900">Transfer Summary</span>
          </div>

          {/* Rows */}
          {summaryRows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center gap-3 px-5 py-4 ${i < summaryRows.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                {row.icon}
              </div>
              <span className="flex-1 text-sm text-gray-400">{row.label}</span>
              <span className={`text-sm ${row.valueClass}`}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Narration Card */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Narration</p>
            <p className="text-sm font-bold text-gray-900">{transferDetails.narration}</p>
          </div>
        </div>

        {/* Secure Transfer Banner */}
        <div className="bg-blue-50 rounded-2xl px-5 py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-gray-900 mb-0.5">Secure Transfer</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your transfer is protected with bank-level security. Please confirm only if the details are correct.
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-2xl transition text-base mt-2"
        >
          <Lock className="w-5 h-5" />
          Confirm Transfer
        </button>

        {/* Cancel */}
        <button
          onClick={() => navigate(-1)}
          className="w-full text-center text-blue-600 font-semibold text-sm py-2 hover:underline transition"
        >
          Cancel Transfer
        </button>
      </div>
    </div>
  );
}

export default ReviewTransfer;
