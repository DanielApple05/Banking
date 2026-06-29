import { useState } from "react";
import {
  ArrowLeft, Search, ChevronRight, ChevronDown,
  ArrowUpRight, Lock, ShieldCheck, CreditCard,
  Bell, User, RefreshCw, HelpCircle, MessageCircle,
  Phone, Mail, FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    category: "Transfers",
    icon: <ArrowUpRight className="w-4 h-4 text-blue-500" />,
    bg: "bg-blue-50",
    items: [
      {
        q: "How do I send money to another account?",
        a: "Go to the Transfer page from the dashboard or bottom nav. Enter the recipient's account number, select their bank, enter the amount and an optional narration, then tap Review Transfer. After reviewing the details, confirm with your 4-digit transaction PIN.",
      },
      {
        q: "Why was my transfer unsuccessful?",
        a: "Transfers can fail due to insufficient balance, an incorrect account number, or an invalid PIN. Check your balance on the dashboard and make sure the recipient's account number is correct before trying again.",
      },
      {
        q: "How long does a transfer take?",
        a: "Transfers between SecureBank accounts are instant. The recipient will see the credit in their account and notifications immediately after your transfer is confirmed.",
      },
      {
        q: "Can I transfer money to myself?",
        a: "No, you cannot transfer money to your own account. If you need to move funds, contact support for assistance.",
      },
      {
        q: "What is the narration field for?",
        a: "The narration is an optional note you can add to describe what the transfer is for — for example, 'Rent payment' or 'Birthday gift'. It appears in both your and the recipient's transaction history.",
      },
    ],
  },
  {
    category: "Security & PIN",
    icon: <Lock className="w-4 h-4 text-orange-500" />,
    bg: "bg-orange-50",
    items: [
      {
        q: "How do I set my transaction PIN?",
        a: "Go to Profile → Security & Privacy → Set Transaction PIN. Enter a 4-digit PIN and confirm it. You'll need this PIN every time you make a transfer.",
      },
      {
        q: "What do I do if I forget my PIN?",
        a: "Go to Profile → Security & Privacy → Reset PIN. Enter your current PIN and set a new one. If you've completely forgotten your PIN, contact our support team.",
      },
      {
        q: "How do I change my password?",
        a: "Go to Profile → Security & Privacy → Change Password. Enter your current password, then your new password twice to confirm. Your password must be at least 6 characters.",
      },
      {
        q: "Is my PIN stored securely?",
        a: "Yes. Your PIN is hashed using bcrypt before being stored — meaning even our team cannot see your actual PIN. It is never stored or transmitted in plain text.",
      },
    ],
  },
  {
    category: "Account & Profile",
    icon: <User className="w-4 h-4 text-purple-500" />,
    bg: "bg-purple-50",
    items: [
      {
        q: "How do I view my account number?",
        a: "Your account number is shown on the dashboard balance card and on your profile page. You can tap the eye icon to reveal or hide it.",
      },
      {
        q: "What is my account name?",
        a: "Your account name is the full name you provided when you registered — for example, 'John Doe'. It is used to identify you when someone looks up your account number.",
      },
      {
        q: "Can I update my profile information?",
        a: "Currently you can update your password and transaction PIN from the Security & Privacy page. For other profile changes, please contact support.",
      },
    ],
  },
  {
    category: "Transactions & History",
    icon: <RefreshCw className="w-4 h-4 text-green-500" />,
    bg: "bg-green-50",
    items: [
      {
        q: "Where can I see my transaction history?",
        a: "Tap Transactions in the bottom navigation bar. You can filter by All, Income, Transfer, or Expense, and search by name or narration.",
      },
      {
        q: "Why is my balance not updating?",
        a: "Try refreshing the page. Your balance updates in real time after every transaction. If the issue persists, sign out and sign back in.",
      },
      {
        q: "What does a failed transaction mean?",
        a: "A failed transaction means the transfer could not be completed. No funds are deducted from your account. Common reasons include insufficient balance or an incorrect PIN.",
      },
    ],
  },
  {
    category: "Notifications",
    icon: <Bell className="w-4 h-4 text-red-500" />,
    bg: "bg-red-50",
    items: [
      {
        q: "How do notifications work?",
        a: "Notifications are generated from your real transaction activity. Every transfer, credit, or payment creates a notification automatically. You can view them by tapping the bell icon on the dashboard.",
      },
      {
        q: "Can I delete notifications?",
        a: "Yes. Tap the trash icon on any notification to remove it. You can also mark all notifications as read using the 'Mark all read' button at the top.",
      },
    ],
  },
  {
    category: "Beneficiaries",
    icon: <CreditCard className="w-4 h-4 text-blue-400" />,
    bg: "bg-blue-50",
    items: [
      {
        q: "What are recent beneficiaries?",
        a: "Recent beneficiaries are accounts you've sent money to before. They are saved automatically after a successful transfer so you can quickly select them next time without re-entering the account number.",
      },
      {
        q: "How many beneficiaries are saved?",
        a: "Up to 5 recent beneficiaries are saved. When a new one is added, the oldest one is removed to keep the list clean.",
      },
    ],
  },
];

const contactOptions = [
  {
    label: "Live Chat",
    description: "Chat with our support team",
    icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
    bg: "bg-blue-50",
    action: () => alert("Live chat coming soon!"),
  },
  {
    label: "Call Us",
    description: "+234 800 000 0000",
    icon: <Phone className="w-5 h-5 text-green-500" />,
    bg: "bg-green-50",
    action: () => window.open("tel:+2348000000000"),
  },
  {
    label: "Email Support",
    description: "support@securebank.com",
    icon: <Mail className="w-5 h-5 text-purple-500" />,
    bg: "bg-purple-50",
    action: () => window.open("mailto:support@securebank.com"),
  },
];

const HelpCenter = () => {
   const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const filtered = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Help Center</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* Hero */}
        <div
          className="relative rounded-3xl overflow-hidden px-5 py-6 mb-6"
          style={{ background: "linear-gradient(135deg, #3b5bdb 0%, #4c6ef5 60%, #748ffc 100%)" }}
        >
          <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
          </svg>
          <div className="absolute bottom-3 right-4 opacity-10">
            <HelpCircle className="w-20 h-20 text-white" />
          </div>
          <div className="relative z-10">
            <h2 className="text-white text-xl font-extrabold mb-1">How can we help?</h2>
            <p className="text-blue-100 text-xs mb-4">Search our knowledge base or browse by topic.</p>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <h2 className="text-sm font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h2>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <Search className="w-10 h-10 mb-3" />
            <p className="text-sm font-semibold">No results found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {filtered.map((cat) => (
              <div key={cat.category} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition text-left"
                >
                  <div className={`w-8 h-8 rounded-full ${cat.bg} flex items-center justify-center shrink-0`}>
                    {cat.icon}
                  </div>
                  <span className="flex-1 text-sm font-extrabold text-gray-900">{cat.category}</span>
                  <span className="text-xs text-gray-400 mr-2">{cat.items.length} articles</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openCategory === cat.category ? "rotate-180" : ""}`} />
                </button>

                {/* FAQ Items */}
                {openCategory === cat.category && (
                  <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {cat.items.map((item, i) => (
                      <div key={i}>
                        <button
                          onClick={() => setOpenItem(openItem === `${cat.category}-${i}` ? null : `${cat.category}-${i}`)}
                          className="w-full flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition text-left"
                        >
                          <span className="flex-1 text-sm font-semibold text-gray-800">{item.q}</span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform ${openItem === `${cat.category}-${i}` ? "rotate-180" : ""}`} />
                        </button>
                        {openItem === `${cat.category}-${i}` && (
                          <div className="px-5 pb-4">
                            <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <h2 className="text-sm font-extrabold text-gray-900 mb-3">Still need help?</h2>
        <div className="flex flex-col gap-3 mb-6">
          {contactOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={opt.action}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md active:scale-95 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-full ${opt.bg} flex items-center justify-center shrink-0`}>
                {opt.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                <p className="text-xs text-gray-400">{opt.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Terms */}
        <button
          onClick={() => navigate("/terms")}
          className="w-full flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition text-left"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">Terms & Privacy Policy</p>
            <p className="text-xs text-gray-400">Read our terms of service and privacy policy</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </button>

        {/* Version */}
        <p className="text-center text-xs text-gray-300 mt-8">SecureBank v1.0.0 • Made with ❤️</p>

      </div>
    </div>
  );
}

export default HelpCenter;
