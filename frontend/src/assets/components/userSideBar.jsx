import { useState } from "react";
import {
  ArrowLeft, User, Mail, CreditCard, Landmark, ShieldCheck,
  LogOut, ChevronRight, Bell, Lock, HelpCircle, FileText,
  Eye, EyeOff, Home, List, RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../utils";

const UserSideBar = () => {

  const navigate = useNavigate();
  const [showAccount, setShowAccount] = useState(false);
  const [activeNav, setActiveNav] = useState("Profile");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = storedUser.username?.split(" ")[0] || "User";

  const menuItems = [
    {
      section: "Account",
      items: [
        { label: "Personal Information", icon: <User className="w-4 h-4 text-blue-500" />, bg: "bg-blue-50", path: null },
        { label: "Notifications", icon: <Bell className="w-4 h-4 text-purple-500" />, bg: "bg-purple-50", path: "/notifications" },
        { label: "Security & Password", icon: <Lock className="w-4 h-4 text-orange-500" />, bg: "bg-orange-50", path: null },
      ],
    },
    {
      section: "Support",
      items: [
        { label: "Help Center", icon: <HelpCircle className="w-4 h-4 text-green-500" />, bg: "bg-green-50", path: null },
        { label: "Terms & Privacy", icon: <FileText className="w-4 h-4 text-gray-400" />, bg: "bg-gray-100", path: null },
      ],
    },
  ];
  return (
    <>
      <div className="absolute top-0 right-0 bg-black/90 backdrop-blur-md p-4  min-h-screen  w-full flex text-white">
        <div className="flex-1 overflow-y-auto pb-24">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-6 pb-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-lg font-extrabold text-gray-900">My Profile</h1>
            <div className="w-9" />
          </div>

          {/* Avatar + Name */}
          <div className="flex flex-col items-center px-5 pb-6">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-extrabold mb-3 shadow-lg">
              {firstName.slice(0, 2).toUpperCase()}
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">{storedUser.username || "User"}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{storedUser.email || ""}</p>

            {/* Verified badge */}
            <div className="flex items-center gap-1.5 mt-2 bg-green-50 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-green-600 font-semibold">Verified Account</span>
            </div>
          </div>

          {/* Account Card */}
          <div className="mx-5 mb-6">
            <div
              className="relative rounded-3xl overflow-hidden p-5"
              style={{ background: "linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 60%, #748ffc 100%)" }}
            >
              <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 80" preserveAspectRatio="none">
                <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
              </svg>
              <div className="absolute bottom-3 right-4 opacity-10">
                <Landmark className="w-16 h-16 text-white" />
              </div>

              <div className="relative z-10">
                <p className="text-blue-200 text-xs font-medium mb-1">Account Name</p>
                <p className="text-white font-bold text-base mb-4">{storedUser.accountName || storedUser.username}</p>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-blue-200 text-xs font-medium mb-1">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-bold tracking-widest text-sm">
                        {showAccount
                          ? storedUser.accountNumber
                          : `**** **** **** ${storedUser.accountNumber?.slice(-4) ?? "----"}`}
                      </p>
                      <button onClick={() => setShowAccount(!showAccount)} className="text-blue-200 hover:text-white transition">
                        {showAccount ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-xs font-medium mb-1">Balance</p>
                    <p className="text-white font-extrabold text-lg">
                      ₦{storedUser.balance?.toLocaleString() ?? "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="mx-5 grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Username", value: storedUser.username, icon: <User className="w-4 h-4 text-blue-500" /> },
              { label: "Email", value: storedUser.email, icon: <Mail className="w-4 h-4 text-blue-500" /> },
              { label: "Account", value: `**** ${storedUser.accountNumber?.slice(-4)}`, icon: <CreditCard className="w-4 h-4 text-blue-500" /> },
              { label: "Bank", value: "SecureBank", icon: <Landmark className="w-4 h-4 text-blue-500" /> },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <p className="text-xs text-gray-400">{item.label}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Menu Sections */}
          <div className="px-5 flex flex-col gap-5">
            {menuItems.map((section) => (
              <div key={section.section}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
                  {section.section}
                </p>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => item.path && navigate(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition text-left"
                    >
                      <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <span className="flex-1 text-sm font-semibold text-gray-800">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Sign Out */}
            <button
              onClick={() => signOut(navigate)}
              className="w-full flex items-center justify-center gap-2 border border-red-200 bg-red-50 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-100 transition text-sm mb-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSideBar;
