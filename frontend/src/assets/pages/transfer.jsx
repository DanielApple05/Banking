import { useState, useEffect } from "react";
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
import { getBalance, lookupAccount, } from "../../api/transactions";
import { getInitials } from "../../utils";

const banks = ["SecureBank"];
const currencies = ["USD", "EUR", "GBP", "NGN"];


const Transfer = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState(
    JSON.parse(localStorage.getItem('beneficiaries') || '[]')
  );
  const [availableBalance, setAvailableBalance] = useState(0);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [resolvedName, setResolvedName] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [narration, setNarration] = useState("");
  const [showBeneficiaryDrop, setShowBeneficiaryDrop] = useState(false);
  const [showBankDrop, setShowBankDrop] = useState(false);
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch real balance on mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await getBalance();
        setAvailableBalance(res.data.balance);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const lookup = async () => {
      if (accountNumber.length < 10) {
        setResolvedName('');
        return;
      }
      setLookupLoading(true);
      try {
        const res = await lookupAccount(accountNumber);
        setResolvedName(res.data.accountName);
        setError('')
      } catch (err) {
        setResolvedName('');
      } finally {
        setLookupLoading(false);
      }
    };
    const delay = setTimeout(lookup, 600); // debounce — waits 600ms after typing stops
    return () => clearTimeout(delay);
  }, [accountNumber]);


  const handleReview = async (e) => {
    e.preventDefault();
    setError('');

    if (!accountNumber) return setError('Please enter or select a recipient account.');
    if (!selectedBank) return setError('Please select a bank.');
    if (!amount || Number(amount) <= 0) return setError('Please enter a valid amount.');
    if (Number(amount) > availableBalance) return setError('Insufficient balance.');
    if ( resolvedName === '') return setError('invalid account');

    setLoading(true);
    try {
      // Save beneficiary if new
      const existing = JSON.parse(localStorage.getItem('beneficiaries') || '[]');
      const alreadyExists = existing.find((b) => b.account === accountNumber);
      if (!alreadyExists) {
        const beneficiaryName = resolvedName || selectedBeneficiary || 'Unknown';
        const newBeneficiary = {
          id: Date.now(),
          name: beneficiaryName,
          initials: getInitials(beneficiaryName),
          account: accountNumber,
          bank: "SecureBank",
          bg: "bg-blue-100",
          text: "text-blue-700",
        };
        const updated = [newBeneficiary, ...existing].slice(0, 5);
        localStorage.setItem('beneficiaries', JSON.stringify(updated));
        setBeneficiaries(updated);
      }
      // Navigate to review WITHOUT calling backend
      navigate('/review-transfer', {
        state: {
          recipient: resolvedName || selectedBeneficiary || accountNumber,
          accountNumber,
          bank: selectedBank,
          amount: Number(amount),
          currency,
          narration,
        }
      });

    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectBeneficiary = (b) => {
    setSelectedBeneficiary(b.name);
    setAccountNumber(b.account);
    setSelectedBank(b.bank)
    setShowBeneficiaryDrop(false);
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

        {/* Error message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

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
              Select Beneficiary
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
                    <p className="text-xs text-gray-400">**** {b.account.slice(-4)}</p>
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

        {/* Account name display — shows below input */}
        {lookupLoading && (
          <p className="text-xs text-gray-400 mb-5 pl-1">Looking up account...</p>
        )}
        {resolvedName && !lookupLoading && (
          <p className="text-xs text-green-600 font-semibold mb-5 pl-1">✓ {resolvedName}</p>
        )}
        {!resolvedName && !lookupLoading && accountNumber.length >= 10 && (
          <p className="text-xs text-red-400 mb-5 pl-1">Account not found</p>
        )}

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
          Available Balance: <span className="text-blue-600 font-semibold">₦{availableBalance.toLocaleString()}</span>
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
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl transition text-base mb-8
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
        >
          <SendHorizonal className="w-5 h-5" />
          {loading ? 'Processing...' : 'Review Transfer'}
        </button>

        {/* Recent Beneficiaries */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-extrabold text-gray-900">Recent Beneficiaries</h2>
          <button className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {beneficiaries.map((b) => (
            <button key={b.id} onClick={() => selectBeneficiary(b)}
              className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-sm hover:shadow-md active:scale-95 transition-all text-left">
              <div className={`w-10 h-10 rounded-full ${b.bg} ${b.text} flex items-center justify-center text-sm font-bold shrink-0`}>
                {b.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{b.name}</p>
                <p className="text-xs text-gray-400">**** {b.account.slice(-4)}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transfer;
