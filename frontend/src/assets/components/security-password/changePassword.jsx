import { useState } from "react";
import { changePassword } from "../../../api/auth";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

const ChangePassword = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword)
      return setMessage({ text: "All fields are required.", type: "error" });
    if (passwordData.newPassword.length < 6)
      return setMessage({ text: "Password must be at least 6 characters.", type: "error" });
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return setMessage({ text: "Passwords do not match.", type: "error" });

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });
      const res = await changePassword(passwordData);
      setMessage({ text: res.data.message, type: "success" });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Unable to change password", type: "error" });
    } finally {
      setLoading(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  const passwordsMatch =
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword === passwordData.confirmPassword;

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="flex flex-col gap-3">

      {message.text && (
        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium
          ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
        >
          {message.type === "success"
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Current Password */}
      <div className="relative">
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="Current password"
          className={inputClass}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          value={passwordData.currentPassword}
        />
        <button
          type="button"
          onClick={() => setViewPassword(!viewPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {viewPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* New Password */}
      <input
        type={viewPassword ? "text" : "password"}
        placeholder="New password"
        className={inputClass}
        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        value={passwordData.newPassword}
      />

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={viewPassword ? "text" : "password"}
          placeholder="Confirm new password"
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition
            ${passwordsMatch ? "border-green-400 focus:ring-green-400" : "border-gray-200 focus:ring-blue-500"}`}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          value={passwordData.confirmPassword}
        />
        {passwordsMatch && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
      </div>

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition mt-1
          ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
      >
        {loading ? "Saving..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
