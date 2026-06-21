import { useState } from "react";
import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpRight,
  CreditCard,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const allTransactions = [
  {
    id: 1,
    title: "Salary",
    category: "Income",
    date: "Jun 20, 2026",
    time: "09:00 AM",
    amount: "+₦2,500.00",
    positive: true,
    status: "Successful",
    icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    title: "Transfer to Alex",
    category: "Transfer",
    date: "Jun 19, 2026",
    time: "02:30 PM",
    amount: "-₦500.00",
    positive: false,
    status: "Successful",
    icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    title: "Shopping",
    category: "Expense",
    date: "Jun 18, 2026",
    time: "11:15 AM",
    amount: "-₦120.00",
    positive: false,
    status: "Successful",
    icon: <CreditCard className="w-5 h-5 text-orange-400" />,
    iconBg: "bg-orange-100",
  },
  {
    id: 4,
    title: "Electricity Bill",
    category: "Expense",
    date: "Jun 18, 2026",
    time: "09:20 AM",
    amount: "-₦60.00",
    positive: false,
    status: "Successful",
    icon: <MoreHorizontal className="w-5 h-5 text-purple-400" />,
    iconBg: "bg-purple-100",
  },
  {
    id: 5,
    title: "Transfer to Sarah",
    category: "Transfer",
    date: "Jun 17, 2026",
    time: "04:10 PM",
    amount: "-₦1,000.00",
    positive: false,
    status: "Failed",
    icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 6,
    title: "Freelance Payment",
    category: "Income",
    date: "Jun 15, 2026",
    time: "08:00 AM",
    amount: "+₦75,000.00",
    positive: true,
    status: "Successful",
    icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
  {
    id: 7,
    title: "Groceries",
    category: "Expense",
    date: "Jun 14, 2026",
    time: "01:30 PM",
    amount: "-₦85.00",
    positive: false,
    status: "Successful",
    icon: <CreditCard className="w-5 h-5 text-orange-400" />,
    iconBg: "bg-orange-100",
  },
  {
    id: 8,
    title: "Transfer to John",
    category: "Transfer",
    date: "Jun 12, 2026",
    time: "10:45 AM",
    amount: "-₦20,000.00",
    positive: false,
    status: "Successful",
    icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 9,
    title: "Internet Bill",
    category: "Expense",
    date: "Jun 10, 2026",
    time: "11:00 AM",
    amount: "-₦45.00",
    positive: false,
    status: "Successful",
    icon: <MoreHorizontal className="w-5 h-5 text-purple-400" />,
    iconBg: "bg-purple-100",
  },
  {
    id: 10,
    title: "Bonus",
    category: "Income",
    date: "Jun 5, 2026",
    time: "09:15 AM",
    amount: "+₦10,000.00",
    positive: true,
    status: "Successful",
    icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
];

const filters = ["All", "Income", "Transfer", "Expense"];

const Transactions = () => {
const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allTransactions.filter((tx) => {
    const matchesFilter = activeFilter === "All" || tx.category === activeFilter;
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group by date
  const grouped = filtered.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = [];
    acc[tx.date].push(tx);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Transactions</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <SlidersHorizontal className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* Search */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-blue-500 transition mb-5">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition
                ${activeFilter === f
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Summary Strip */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Income", value: "+₦87,500", color: "text-green-500" },
            { label: "Expenses", value: "-₦310", color: "text-red-500" },
            { label: "Transfers", value: "-₦21,500", color: "text-blue-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl px-3 py-3 shadow-sm text-center">
              <p className={`text-sm font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Grouped Transaction List */}
        {Object.keys(grouped).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <Search className="w-10 h-10 mb-3" />
            <p className="text-sm font-semibold">No transactions found</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date} className="mb-5">
              {/* Date label */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">{date}</p>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                {txs.map((tx) => (
                  <button
                    key={tx.id}
                    className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition text-left"
                  >
                    <div className={`w-11 h-11 rounded-full ${tx.iconBg} flex items-center justify-center shrink-0`}>
                      {tx.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{tx.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tx.time}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${tx.positive ? "text-green-500" : "text-gray-900"}`}>
                        {tx.amount}
                      </p>
                      <p className={`text-xs mt-0.5 ${tx.status === "Failed" ? "text-red-400" : "text-gray-400"}`}>
                        {tx.status}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-200 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;
