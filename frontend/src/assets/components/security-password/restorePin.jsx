import React, { useState } from "react";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";
import { restoreDefaultPin } from "../../../api/auth";

const RestorePin = () => {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleRestorePin = async (e) => {
    e.preventDefault();
    if (!confirmEmail)
      return setMessage({ text: "Please enter your email.", type: "error" });

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const res = await restoreDefaultPin({ confirmEmail });

      setMessage({ text: res.data.message, type: "success" });
      setConfirmEmail("");
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Unable to restore PIN",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {message.text && (
        <div
          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium
          ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleRestorePin} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition
          ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
        >
          {loading ? "Restoring..." : "Restore PIN"}
        </button>
      </form>
    </div>
  );
};

export default RestorePin;
