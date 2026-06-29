import { resetPin } from "../../../api/auth";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const ResetPin = () => {
  const [viewPin, setViewPin] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [resetPinData, setResetPinData] = useState({
    oldPin: "",
    newPin: "",
    confirmNewPin: "",
  });

  const handleResetPin = async () => {
    if (!resetPinData.oldPin || !resetPinData.newPin || !resetPinData.confirmNewPin)
      return setMessage({ text: "All fields are required.", type: "error" });
    if (resetPinData.newPin.length < 4)
      return setMessage({ text: "New PIN must be exactly 4 digits.", type: "error" });
    if (resetPinData.newPin !== resetPinData.confirmNewPin)
      return setMessage({ text: "New PINs do not match.", type: "error" });

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });
      const res = await resetPin(resetPinData);
      setMessage({ text: res.data.message, type: "success" });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Unable to reset PIN", type: "error" });
    } finally {
      setLoading(false);
      setResetPinData({ oldPin: "", newPin: "", confirmNewPin: "" });
    }
  };

  const pinsMatch =
    resetPinData.newPin &&
    resetPinData.confirmNewPin &&
    resetPinData.newPin === resetPinData.confirmNewPin;

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

      {/* Current PIN */}
      <div className="relative">
        <input
          type={viewPin ? "tel" : "password"}
          maxLength="4"
          inputMode="numeric"
          placeholder="Current PIN"
          className={inputClass}
          onChange={(e) =>
            setResetPinData({ ...resetPinData, oldPin: e.target.value.replace(/[^0-9]/g, "") })
          }
          value={resetPinData.oldPin}
        />
        <button
          type="button"
          onClick={() => setViewPin(!viewPin)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {viewPin ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* New PIN */}
      <input
        type={viewPin ? "tel" : "password"}
        maxLength="4"
        inputMode="numeric"
        placeholder="New PIN"
        className={inputClass}
        onChange={(e) =>
          setResetPinData({ ...resetPinData, newPin: e.target.value.replace(/[^0-9]/g, "") })
        }
        value={resetPinData.newPin}
      />

      {/* Confirm New PIN */}
      <div className="relative">
        <input
          type={viewPin ? "tel" : "password"}
          maxLength="4"
          inputMode="numeric"
          placeholder="Confirm new PIN"
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition
            ${pinsMatch ? "border-green-400 focus:ring-green-400" : "border-gray-200 focus:ring-blue-500"}`}
          onChange={(e) =>
            setResetPinData({ ...resetPinData, confirmNewPin: e.target.value.replace(/[^0-9]/g, "") })
          }
          value={resetPinData.confirmNewPin}
        />
        {pinsMatch && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
      </div>

      <button
        onClick={handleResetPin}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition mt-1
          ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
      >
        {loading ? "Resetting..." : "Reset PIN"}
      </button>
    </div>
  );
};

export default ResetPin;
