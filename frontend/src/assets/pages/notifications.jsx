import { useState, useEffect } from "react";
import { getTransactions } from "../../api/transactions";
import { getToken } from "../../helpers";
import { getUserFromToken } from "../../utils";
import {
  ArrowLeft,
  Bell,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    const user = getUserFromToken(token);
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data || []);
      } catch (err) {
        setError({ message: "Failed to fetch notifications" });
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

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Notifications</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {error && (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-sm text-red-500 font-medium">{error.message}</p>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-gray-400 font-medium">Loading notifications...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300">
            <Bell className="w-12 h-12 mb-3" />
            <p className="text-sm font-semibold text-gray-400">No notifications yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Your transaction alerts will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {transactions.map((tx) => {
              const isCredit = tx.type === "credit" || tx.receiverAccountNumber === storedUser.accountNumber;

              return (
                <div
                  key={tx._id}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${isCredit ? "bg-green-50" : "bg-red-50"}`}
                  >
                    {isCredit ? (
                      <ArrowDownLeft className="w-4.5 h-4.5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-4.5 h-4.5 text-red-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {isCredit
                        ? ` ${tx.title || "Received from SecureBank user"}`
                        : ` ${tx.title || tx.recipient  }`}
                    </p>
                    <p className="text-xs text-gray-400">{formatTime(tx.createdAt)}</p>
                  </div>

                  <p className={`text-sm font-bold shrink-0 ${isCredit ? "text-green-600" : "text-gray-900"}`}>
                    {isCredit ? "+" : "-"}₦{Number(tx.amount).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
