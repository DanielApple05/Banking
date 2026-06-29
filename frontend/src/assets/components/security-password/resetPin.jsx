import { resetPin } from "../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const ResetPin = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewPin, setViewPin] = useState(false)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetPinData, setResetPinData] = useState({
    oldPin: "",
    newPin: "",
    confirmNewPin: "",
  });

  const handleResetPin = async (e) => {
    e.preventDefault();
    if (!resetPinData.oldPin || !resetPinData.newPin || !resetPinData.confirmNewPin) return setMessage("All fields are required.");
    if (resetPinData.newPin.length < 4) return setMessage("New PIN must be exactly 4 digits.");
    if (resetPinData.newPin !== resetPinData.confirmNewPin) return setMessage("password mismatch")

    try {
      setLoading(true);
      setMessage("");
      const res = await resetPin(resetPinData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to reset PIN"
      );
    } finally {
      setLoading(false);
       setResetPinData({
        oldPin: "",
        newPin: "",
        confirmNewPin: "",
      })
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
          <div className=" relative flex justify-between">
            <input
              type={viewPin ? "tel" : "password"}
              maxLength="4"
              inputMode="numeric"
              placeholder="Current PIN"
              className="w-full border p-2 mb-3 flex-1"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setResetPinData({
                  ...resetPinData,
                  oldPin: value,
                })
              }}
              value={resetPinData.oldPin}
            />
            <div className="absolute right-5  top-2 z-10 " onClick={() => setViewPin(!viewPin)}>
              {viewPin ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <input
            type={viewPin ? "tel" : "password"}
            maxLength="4"
            inputMode="numeric"
            placeholder="New PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setResetPinData({
                ...resetPinData,
                newPin: value,
              })
            }}
            value={resetPinData.newPin}
          />

          <input
            type={viewPin ? "tel" : "password"}
            maxLength="4"
            inputMode="numeric"
            placeholder="Confirm New PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setResetPinData({
                ...resetPinData,
                confirmNewPin: value,
              })
            }}
            value={resetPinData.confirmNewPin}
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
