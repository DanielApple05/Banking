import { useEffect, useState } from "react";
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
import { getTransactions } from "../../api/transactions";
import { getTransactionIcon } from "../../utils";
import { getToken } from "../../helpers";


const formatDisplayDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatDisplayTime = (value) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (amount) => `₦${Number(amount || 0).toLocaleString()}`;

const Transactions = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  const filtered = transactions.filter((tx) => {
    const searchText = `${tx.title} ${tx.recipient || ""} ${tx.narration || ""}`.toLowerCase();
    const matchesFilter = activeFilter === "All" || tx.category === activeFilter;
    const matchesSearch = searchText.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const grouped = filtered.reduce((acc, tx) => {
    const date = formatDisplayDate(tx.createdAt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading transactions...</p>
        </div>
      </div>
    );
  }

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

        {/* Grouped Transaction List */}
        {Object.keys(grouped).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <Search className="w-10 h-10 mb-3" />
            <p className="text-sm font-semibold">No transactions found</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date} className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">{date}</p>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                {txs.map((tx) => {
                  const { icon, bg } = getTransactionIcon(tx.category);
                  const isCredit = tx.type === "credit";

                  return (
                    <button
                      key={tx._id}
                      className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition text-left"
                    >
                      <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{tx.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDisplayTime(tx.createdAt)}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-bold ${isCredit ? "text-green-500" : "text-gray-900"}`}>
                          {isCredit ? "+" : "-"}
                          {formatCurrency(tx.amount)}
                        </p>
                        <p className={`text-xs mt-0.5 ${tx.status === "Failed" ? "text-red-400" : "text-gray-400"}`}>
                          {tx.status}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-200 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
