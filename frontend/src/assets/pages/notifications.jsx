import { useState } from "react";
import {
  ArrowLeft,
  Bell,

} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">

      <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
        <ArrowLeft className="w-5 h-5 text-gray-800" />
      </button>
      <div className="flex-1 overflow-y-auto px-5 pb-10">

        <div className="flex flex-col items-center justify-center py-24 text-gray-300">
          <Bell className="w-12 h-12 mb-3" />
          <p className="text-sm font-semibold">No notifications yet</p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
