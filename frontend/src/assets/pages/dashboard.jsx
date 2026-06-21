import { useState, useEffect } from "react";
import {
  Bell,
  User,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownToLine,
  CreditCard,
  MoreHorizontal,
  Home,
  List,
  RefreshCw,
  ChevronRight,
  Landmark,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBalance, getTransactions } from "../../api/transactions";

const quickActions = [
  {
    label: "Send Money",
    icon: <ArrowUpRight className="w-6 h-6 text-white" />,
    bg: "bg-blue-600",
    path: "/transfer",
  },
  {
    label: "Deposit",
    icon: <ArrowDownToLine className="w-6 h-6 text-white" />,
    bg: "bg-green-500",
    path: "/deposit",
  },
  {
    label: "Withdraw",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    bg: "bg-purple-600",
    path: "/withdraw",
  },
  {
    label: "More",
    icon: <MoreHorizontal className="w-6 h-6 text-white" />,
    bg: "bg-orange-400",
    path: "/more",
  },
];

const navItems = [
  { label: "Home", icon: Home, path: "/dashboard" },
  { label: "Transactions", icon: List, path: "/transactions" },
  { label: "Transfer", icon: RefreshCw, path: "/transfer" },
  { label: "Cards", icon: CreditCard, path: "/cards" },
  { label: "Profile", icon: User, path: "/profile" },
];

const getTransactionIcon = (category) => {
  if (category === "Income")   return { icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />, bg: "bg-green-100" };
  if (category === "Transfer") return { icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,    bg: "bg-blue-100"  };
  if (category === "Expense")  return { icon: <CreditCard className="w-5 h-5 text-orange-400" />,    bg: "bg-orange-100"};
  return { icon: <MoreHorizontal className="w-5 h-5 text-purple-400" />, bg: "bg-purple-100" };
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' • ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const Dashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }

    const fetchData = async () => {
      try {
        const [balanceRes, txRes] = await Promise.all([
          getBalance(),
          getTransactions(),
        ]);
        setUserData(balanceRes.data);
        setTransactions(txRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              Hello, {storedUser.username || 'User'} <span>👋</span>
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">{getGreeting()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition" onClick={() => navigate("/notifications")}>
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative rounded-3xl overflow-hidden mb-7"
          style={{ background: "linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 60%, #748ffc 100%)" }}>
          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
          </svg>
          {/* Bank icon watermark */}
          <div className="absolute bottom-4 right-5 opacity-20">
            <Landmark className="w-20 h-20 text-white" />
          </div>

          <div className="relative z-10 p-6">
            <div className="flex justify-between items-start">
              {/* Left: balance */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-100 text-sm font-medium">Total Balance</span>
                  <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-blue-100 hover:text-white transition">
                    {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-white text-4xl font-extrabold tracking-tight mb-4">
                  {balanceVisible ? `₦${userData?.balance?.toLocaleString() ?? '0.00'}` : "••••••••"}
                </div>
                <div className="text-blue-200 text-xs font-medium mb-0.5">Available Balance</div>
                <div className="text-white text-lg font-bold">
                  {balanceVisible ? `₦${userData?.balance?.toLocaleString() ?? '0.00'}` : "••••••"}
                </div>
              </div>
              {/* Right: account number */}
              <div className="text-right">
                <div className="text-blue-200 text-xs font-medium mb-1">Account Number</div>
                <div className="text-white text-sm font-semibold tracking-widest">
                  **** **** **** {userData?.accountNumber?.slice(-4) ?? '----'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-7">
          <h2 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl py-4 px-2 shadow-sm hover:shadow-md active:scale-95 transition-all"
              >
                <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center shadow`}>
                  {action.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-gray-900">Recent Transactions</h2>
            <button onClick={() => navigate("/transactions")} className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm px-4 py-8 text-center text-gray-300">
              <p className="text-sm font-semibold">No transactions yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {transactions.map((tx) => {
                const { icon, bg } = getTransactionIcon(tx.category);
                return (
                  <div key={tx._id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition cursor-pointer">
                    <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{tx.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(tx.createdAt)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-gray-900'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                      </p>
                      <p className={`text-xs mt-0.5 ${tx.status === 'Failed' ? 'text-red-400' : 'text-gray-400'}`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => { setActiveNav(label); navigate(path); }}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition"
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span className={`text-xs font-semibold ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
