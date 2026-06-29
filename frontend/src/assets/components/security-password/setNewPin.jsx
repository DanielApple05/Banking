import { useState } from "react";
import { setNewPin } from "../../../api/auth";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

const SetNewPin = () => {
  const [viewPin, setViewPin] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [setPinData, setSetPinData] = useState({ pin: "", confirmPin: "" });

  const handleSetPin = async (e) => {
    e.preventDefault();

    if (setPinData.pin.length < 4)
      return setMessage({ text: "PIN must be exactly 4 digits", type: "error" });

    if (setPinData.pin !== setPinData.confirmPin)
      return setMessage({ text: "PINs do not match", type: "error" });

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });
      const res = await setNewPin({ pin: setPinData.pin });
      setMessage({ text: res.data.message, type: "success" });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Unable to set PIN", type: "error" });
    } finally {
      setLoading(false);
      setSetPinData({ pin: "", confirmPin: "" });
    }
  };

  const pinsMatch = setPinData.pin && setPinData.confirmPin && setPinData.pin === setPinData.confirmPin;

  return (
    <div className="flex flex-col gap-3">

      {message.text && (
        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium
          ${message.type === "success"
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-600"}`}
        >
          {message.type === "success"
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* PIN input */}
      <div className="relative">
        <input
          type={viewPin ? "tel" : "password"}
          maxLength="4"
          inputMode="numeric"
          placeholder="Enter new PIN"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          onChange={(e) =>
            setSetPinData({ ...setPinData, pin: e.target.value.replace(/[^0-9]/g, "") })
          }
          value={setPinData.pin}
        />
        <button
          type="button"
          onClick={() => setViewPin(!viewPin)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {viewPin ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Confirm PIN input */}
      <div className="relative">
        <input
          type={viewPin ? "tel" : "password"}
          maxLength="4"
          inputMode="numeric"
          placeholder="Confirm new PIN"
          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition
            ${pinsMatch ? "border-green-400 focus:ring-green-400" : "border-gray-200 focus:ring-blue-500"}`}
          onChange={(e) =>
            setSetPinData({ ...setPinData, confirmPin: e.target.value.replace(/[^0-9]/g, "") })
          }
          value={setPinData.confirmPin}
        />
        {pinsMatch && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
      </div>

      <button
        onClick={handleSetPin}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition mt-1
          ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
      >
        {loading ? "Saving..." : "Set PIN"}
      </button>
    </div>
  );
};

export default SetNewPin;
