import { ArrowLeft, ShieldCheck, KeyRound, Lock, RefreshCw } from "lucide-react";
import SetNewPin from "../components/security-password/setNewPin";
import ResetPin from "../components/security-password/resetPin";
import ChangePassword from "../components/security-password/changePassword";
import { useNavigate } from "react-router-dom";
import RestorePin from "../components/security-password/restorePin";

const SecurityAndPrivacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-5 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Security & Privacy</h1>
          <div className="w-9" />
        </div>

        {/* Shield banner */}
        <div className="flex items-center gap-3 bg-white/15 rounded-2xl px-4 py-3">
          <ShieldCheck className="w-5 h-5 text-white shrink-0" />
          <p className="text-xs text-white/90 font-medium leading-relaxed">
            Never share your PIN or password with anyone, including SecureBank staff.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-5 py-6">

        {/* Set PIN */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Set PIN</p>
              <p className="text-xs text-gray-400">Create a new transaction PIN</p>
            </div>
          </div>
          <div className="px-4 pb-4 pt-3">
            <SetNewPin />
          </div>
        </div>

        {/* Reset PIN */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Reset PIN</p>
              <p className="text-xs text-gray-400">Forgot your PIN? Reset it here</p>
            </div>
          </div>
          <div className="px-4 pb-4 pt-3">
            <ResetPin />
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Change Password</p>
              <p className="text-xs text-gray-400">Update your account password</p>
            </div>
          </div>
          <div className="px-4 pb-4 pt-3">
            <ChangePassword />
          </div>
        </div>

        { /* Restore Pin  */}

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm p-4">
          <RestorePin />
        </div>
      </div>
    </div>
  );
};

export default SecurityAndPrivacy;
