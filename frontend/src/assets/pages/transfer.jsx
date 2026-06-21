import { useState } from "react";
import {
  ArrowLeft,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  User,
  Landmark,
  DollarSign,
  ChevronDown,
  FileText,
  SendHorizonal,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const banks = ["First National Bank", "City Bank", "Union Bank", "Heritage Bank", "Metro Bank"];
const currencies = ["USD", "EUR", "GBP", "NGN"];

const Transfer = () => {
 const navigate = useNavigate();
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [narration, setNarration] = useState("");
  const [showBeneficiaryDrop, setShowBeneficiaryDrop] = useState(false);
  const [showBankDrop, setShowBankDrop] = useState(false);
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);

const handleReview = (e) => {
  e.preventDefault();
  navigate("/review-transfer");
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Transfer Money</h1>
        <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
          <HelpCircle className="w-4 h-4" /> Help
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* Info Banner */}
        <div className="flex items-center gap-4 bg-blue-50 rounded-2xl px-4 py-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-gray-900">Send money securely</p>
            <p className="text-xs text-gray-500 mt-0.5">Transfer to any bank account quickly and easily.</p>
          </div>
          <ShieldCheck className="w-10 h-10 text-blue-200 shrink-0" />
        </div>

        {/* Beneficiary */}
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Beneficiary</label>

        {/* Select Beneficiary Dropdown */}
        <div className="relative mb-3">
          <button
            type="button"
            onClick={() => { setShowBeneficiaryDrop(!showBeneficiaryDrop); setShowBankDrop(false); setShowCurrencyDrop(false); }}
            className="w-full flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white hover:border-blue-400 transition text-left"
          >
            <User className="w-5 h-5 text-blue-500 shrink-0" />
            <span className={`flex-1 text-sm ${selectedBeneficiary ? "text-gray-900 font-semibold" : "text-gray-400"}`}>
              {selectedBeneficiary || "Select Beneficiary"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {showBeneficiaryDrop && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {beneficiaries.map((b) => (
                <button
                  key={b.id}
                  onClick={() => selectBeneficiary(b)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left"
                >
                  <div className={`w-8 h-8 rounded-full ${b.bg} ${b.text} flex items-center justify-center text-xs font-bold`}>
                    {b.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.account}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Account Number */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white focus-within:border-blue-500 transition mb-6">
          <Landmark className="w-5 h-5 text-blue-500 shrink-0" />
          <input
            type="text"
            placeholder="Enter Account Number"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <User className="w-5 h-5 text-blue-400 shrink-0" />
        </div>

        {/* Bank */}
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Bank</label>
        <div className="relative mb-6">
          <button
            type="button"
            onClick={() => { setShowBankDrop(!showBankDrop); setShowBeneficiaryDrop(false); setShowCurrencyDrop(false); }}
            className="w-full flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white hover:border-blue-400 transition text-left"
          >
            <Landmark className="w-5 h-5 text-blue-500 shrink-0" />
            <span className={`flex-1 text-sm ${selectedBank ? "text-gray-900 font-semibold" : "text-gray-400"}`}>
              {selectedBank || "Select Bank"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {showBankDrop && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => { setSelectedBank(bank); setShowBankDrop(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left text-sm text-gray-800"
                >
                  <Landmark className="w-4 h-4 text-blue-400" />
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount */}
        <label className="block text-sm font-extrabold text-gray-900 mb-2">Amount</label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white focus-within:border-blue-500 transition mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <input
            type="number"
            placeholder="Enter Amount"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* Currency selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setShowCurrencyDrop(!showCurrencyDrop); setShowBankDrop(false); setShowBeneficiaryDrop(false); }}
              className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-blue-600 transition"
            >
              {currency} <ChevronDown className="w-4 h-4" />
            </button>
            {showCurrencyDrop && (
              <div className="absolute right-0 z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden w-24">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCurrency(c); setShowCurrencyDrop(false); }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 transition ${c === currency ? "font-bold text-blue-600" : "text-gray-700"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-5 pl-1">
          Available Balance: <span className="text-blue-600 font-semibold">$4,250.00</span>
        </p>

        {/* Narration */}
        <label className="block text-sm font-extrabold text-gray-900 mb-2">
          Narration <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="flex items-start gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white focus-within:border-blue-500 transition mb-6">
          <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <textarea
            placeholder="What's this for?"
            maxLength={50}
            rows={2}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent resize-none"
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
          />
          <span className="text-xs text-gray-400 shrink-0 mt-0.5">{narration.length}/50</span>
        </div>

        {/* Review Transfer Button */}
        <button
          onClick={handleReview}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-2xl transition text-base mb-8"
        >
          <SendHorizonal className="w-5 h-5" />
          Review Transfer
        </button>
      </div>
    </div>
  );
}

export default Transfer;
