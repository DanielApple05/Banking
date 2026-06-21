import { useState } from "react";
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
  { label: "Home", icon: Home, path: "/dashboard", active: true },
  { label: "Transactions", icon: List, path: "/transactions", active: false },
  { label: "Transfer", icon: RefreshCw, path: "/transfer", active: false },
  { label: "Cards", icon: CreditCard, path: "/cards", active: false },
  { label: "Profile", icon: User, path: "/profile", active: false },
];

const Dashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              Hello, John <span>👋</span>
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">{getGreeting()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition" onClick={() => navigate("/notifications")}>
              <Bell className="w-6 h-6 text-gray-700"  />
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
                    {balanceVisible
                      ? <Eye className="w-4 h-4" />
                      : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-white text-4xl font-extrabold tracking-tight mb-4">
                  {balanceVisible ? "$4,250.00" : "••••••••"}
                </div>
                <div className="text-blue-200 text-xs font-medium mb-0.5">Available Balance</div>
                <div className="text-white text-lg font-bold">
                  {balanceVisible ? "$4,250.00" : "••••••"}
                </div>
              </div>
              {/* Right: account number */}
              <div className="text-right">
                <div className="text-blue-200 text-xs font-medium mb-1">Account Number</div>
                <div className="text-white text-sm font-semibold tracking-widest">
                  **** **** **** 5678
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
