import { useState } from "react";
import { setNewPin } from "../../api/auth";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import SetNewPin from "../components/security-password/setNewPin";
import ResetPin from "../components/security-password/resetPin";
import ChangePassword from "../components/security-password/changePassword";
import { useNavigate } from "react-router-dom";

const SecurityAndPrivacy = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col max-w-md mx-auto p-5">

      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">Security & Privacy</h1>
        <div className="w-9" />
      </div>


      <div className="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 py-3 mb-6">
        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
        <p className="text-xs text-blue-500 font-medium leading-relaxed">
          Keep your account safe. Never share your PIN or password with anyone.
        </p>
      </div>

      {/* SET PIN */}

      <SetNewPin />

      {/* RESET PIN */}
      <ResetPin />

      {/* CHANGE PASSWORD */}
      <ChangePassword />
    </div>
  );
}

export default SecurityAndPrivacy;
