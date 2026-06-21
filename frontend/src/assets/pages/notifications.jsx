import { useState } from "react";
import {
  ArrowLeft,
  ArrowDownToLine,
  ArrowUpRight,
  ShieldCheck,
  Bell,
  CreditCard,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  {
    id: 1,
    title: "Transfer Successful",
    message: "Your transfer of ₦20,000.00 to John Doe was successful.",
    time: "Just now",
    date: "Today",
    read: false,
    icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Salary Received",
    message: "You have received ₦2,500.00 from Employer Ltd.",
    time: "09:00 AM",
    date: "Today",
    read: false,
    icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
  {
    id: 3,
    title: "Security Alert",
    message: "A new login was detected on your account. If this wasn't you, contact support.",
    time: "08:15 AM",
    date: "Today",
    read: false,
    icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
    iconBg: "bg-red-100",
  },
  {
    id: 4,
    title: "Transfer Failed",
    message: "Your transfer of ₦1,000.00 to Sarah C. could not be processed.",
    time: "04:10 PM",
    date: "Yesterday",
    read: true,
    icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 5,
    title: "Card Payment",
    message: "A payment of ₦120.00 was made using your linked card.",
    time: "11:15 AM",
    date: "Yesterday",
    read: true,
    icon: <CreditCard className="w-5 h-5 text-orange-400" />,
    iconBg: "bg-orange-100",
  },
  {
    id: 6,
    title: "New Feature Available",
    message: "You can now split bills with friends directly from your dashboard.",
    time: "10:00 AM",
    date: "Jun 18, 2026",
    read: true,
    icon: <Bell className="w-5 h-5 text-purple-500" />,
    iconBg: "bg-purple-100",
  },
  {
    id: 7,
    title: "Freelance Payment",
    message: "You have received ₦75,000.00 from Client XYZ.",
    time: "08:00 AM",
    date: "Jun 15, 2026",
    read: true,
    icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
];

const Notifications = () => {
   const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Group by date
  const grouped = notifications.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-extrabold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 ? (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:underline transition"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* Empty state */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300">
            <Bell className="w-12 h-12 mb-3" />
            <p className="text-sm font-semibold">No notifications yet</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="mb-5">
              {/* Date label */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
                {date}
              </p>

              <div className="flex flex-col gap-3">
                {items.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`relative flex items-start gap-4 rounded-2xl px-4 py-4 shadow-sm cursor-pointer transition
                      ${n.read ? "bg-white" : "bg-blue-50 border border-blue-100"}`}
                  >
                    {/* Unread dot */}
                    {!n.read && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600" />
                    )}

                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-full ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      {n.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <p className={`text-sm mb-0.5 ${n.read ? "font-semibold text-gray-800" : "font-extrabold text-gray-900"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">{n.message}</p>
                      <p className="text-xs text-gray-300 mt-1.5">{n.time}</p>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                      className="shrink-0 p-1.5 rounded-full hover:bg-red-50 transition mt-0.5"
                    >
                      <Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400 transition" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
