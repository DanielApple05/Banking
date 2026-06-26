
import { useState, useEffect } from "react";
import {
  Users,
  ArrowUpRight,
  ArrowDownToLine,
  Landmark,
  ShieldCheck,
  Trash2,
  PlusCircle,
  LogOut,
  Activity,
  Search,
  X,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"
import { signOut, getTransactionIcon, getFormatDate, getFormatTime } from "../../utils";


const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
  " • " + new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creditModal, setCreditModal] = useState(null); // { userId, username }
  const [creditAmount, setCreditAmount] = useState("");
  const [creditLoading, setCreditLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

   useEffect(() => {
    if (!storedUser?.isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, txRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/transactions"),
      ]);
      setUsers(usersRes.data);
      setTransactions(txRes.data);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCredit = async () => {
    if (!creditAmount || Number(creditAmount) <= 0) return setError("Enter a valid amount.");
    setCreditLoading(true);
    setError("");
    try {
      await API.patch(`/admin/users/${creditModal.userId}/credit`, { amount: Number(creditAmount) });
      setSuccess(`₦${Number(creditAmount).toLocaleString()} credited to ${creditModal.username}`);
      setCreditModal(null);
      setCreditAmount("");
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Credit failed.");
    } finally {
      setCreditLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      setSuccess("User deleted successfully.");
      setDeleteConfirm(null);
      fetchData();
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTx = transactions.filter((tx) =>
    tx.title.toLowerCase().includes(search.toLowerCase()) ||
    tx.userId?.username?.toLowerCase().includes(search.toLowerCase())
  );

  // Summary stats
  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0);
  const totalTx = transactions.length;
  const totalUsers = users.length;
  const failedTx = transactions.filter((tx) => tx.status === "Failed").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-gray-900">SecureBank Admin</h1>
              <p className="text-xs text-gray-400">Welcome, {storedUser.username}</p>
            </div>
          </div>
          <button
            onClick={() => signOut(navigate)}
            className="flex items-center gap-2 text-sm text-red-500 font-semibold hover:underline"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Success / Error banners */}
        {success && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 mb-6">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            {success}
            <button onClick={() => setSuccess("")} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
            <button onClick={() => setError("")} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: totalUsers, color: "text-blue-600", bg: "bg-blue-50", icon: <Users className="w-5 h-5 text-blue-600" /> },
            { label: "Platform Balance", value: `₦${totalBalance.toLocaleString()}`, color: "text-green-600", bg: "bg-green-50", icon: <Landmark className="w-5 h-5 text-green-600" /> },
            { label: "Total Transactions", value: totalTx, color: "text-purple-600", bg: "bg-purple-50", icon: <Activity className="w-5 h-5 text-purple-600" /> },
            { label: "Failed Transfers", value: failedTx, color: "text-red-500", bg: "bg-red-50", icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {["users", "transactions"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearch(""); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition capitalize
                  ${activeTab === tab ? "bg-blue-600 text-white shadow" : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus-within:border-blue-500 transition w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={activeTab === "users" ? "Search users..." : "Search transactions..."}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-extrabold text-gray-900">All Users ({filteredUsers.length})</span>
            </div>
            {filteredUsers.length === 0 ? (
              <div className="py-16 text-center text-gray-300">
                <Users className="w-10 h-10 mx-auto mb-3" />
                <p className="text-sm font-semibold">No users found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <div key={u._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                      {u.username.slice(0, 2).toUpperCase()}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900">{u.username}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                    {/* Account number */}
                    <div className="hidden sm:block text-center">
                      <p className="text-xs text-gray-400">Account</p>
                      <p className="text-sm font-semibold text-gray-700"> {u.accountNumber}</p>
                    </div>
                    {/* Balance */}
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Balance</p>
                      <p className="text-sm font-extrabold text-green-600">₦{u.balance.toLocaleString()}</p>
                    </div>
                    {/* Admin badge */}
                    {u.isAdmin && (
                      <span className="hidden sm:block text-xs bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setCreditModal({ userId: u._id, username: u.username }); setError(""); }}
                        className="flex items-center gap-1 text-xs bg-green-50 text-green-600 font-semibold px-3 py-1.5 rounded-xl hover:bg-green-100 transition"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Credit
                      </button>
                      {!u.isAdmin && (
                        <button
                          onClick={() => setDeleteConfirm(u)}
                          className="flex items-center gap-1 text-xs bg-red-50 text-red-500 font-semibold px-3 py-1.5 rounded-xl hover:bg-red-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Transactions Table */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-extrabold text-gray-900">All Transactions ({filteredTx.length})</span>
            </div>
            {filteredTx.length === 0 ? (
              <div className="py-16 text-center text-gray-300">
                <Activity className="w-10 h-10 mx-auto mb-3" />
                <p className="text-sm font-semibold">No transactions found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredTx.map((tx) => {
                  const { icon, bg } = getTransactionIcon(tx.category);
                  return (
                    <div key={tx._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                      <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{tx.title}</p>
                        <p className="text-xs text-gray-400">{tx.userId?.username ?? "Unknown"} • {formatDate(tx.createdAt)}</p>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2 py-1 rounded-full">
                          {tx.category}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-500" : "text-gray-900"}`}>
                          {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                        </p>
                        <p className={`text-xs mt-0.5 ${tx.status === "Failed" ? "text-red-400" : "text-gray-400"}`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Credit Modal */}
      {creditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-gray-900">Credit Account</h2>
              <button onClick={() => { setCreditModal(null); setError(""); }}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Adding funds to <span className="font-bold text-gray-900">{creditModal.username}</span>
            </p>
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition mb-4">
              <span className="text-gray-400 font-semibold text-sm">₦</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
              />
            </div>
            <button
              onClick={handleCredit}
              disabled={creditLoading}
              className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-2xl transition
                ${creditLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
            >
              <PlusCircle className="w-4 h-4" />
              {creditLoading ? "Processing..." : "Credit Account"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-gray-900">Delete User</h2>
              <button onClick={() => setDeleteConfirm(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="bg-red-50 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-400 leading-relaxed">
                This will permanently delete <span className="font-bold">{deleteConfirm.username}</span> and all their transactions. This cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;