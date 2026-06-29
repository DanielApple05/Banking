import { resetPin } from "../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const ResetPin = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewNewPin, setViewNewPin] = useState(false)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetPinData, setResetPinData] = useState({
    oldPin: "",
    newPin: "",
  });

  const handleResetPin = async (e) => {
    e.preventDefault();
    if (!resetPinData.oldPin || !resetPinData.newPin) return setResetMsg({ text: "All fields are required.", type: "error" });
    if (resetPinData.newPin.length < 4) return setResetMsg({ text: "New PIN must be exactly 4 digits.", type: "error" });

    try {
      setLoading(true);
      const res = await resetPin(resetPinData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to reset PIN"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="border rounded p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Reset PIN
        </h2>

        {message && (
          <div className="bg-gray-100 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleResetPin}>
          <input
            type="password"
            maxLength="4"
            placeholder="Current PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setResetPinData({
                ...resetPinData,
                oldPin: e.target.value,
              })
            }
          />

          <input
            type="password"
            maxLength="4"
            placeholder="New PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setResetPinData({
                ...resetPinData,
                newPin: e.target.value,
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-sm transition text-white
                ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "resetting..." : "Reset PIN"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPin;
