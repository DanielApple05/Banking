import { useState } from "react";
import { setNewPin } from "../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";

const SetNewPin = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewNewPin, setViewNewPin] = useState(false)
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [setPinData, setSetPinData] = useState({
    pin: "",
    confirmPin: "",
  });

  // SET PIN
  const handleSetPin = async (e) => {
    e.preventDefault();

    // Validate PINs match
    if (setPinData.pin !== setPinData.confirmPin) {
      return setMessage("PINs do not match");
    }

    // Validate PIN is 4 digits
    if (setPinData.pin.length < 4) {
      return setMessage("PIN must be exactly 4 digits");
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await setNewPin({
        pin: setPinData.pin
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to set PIN"
      );
    } finally {
      setLoading(false);
      setSetPinData({
        pin: "",
        confirmPin: "",
      });
    }
  };
  return (
    <>

      {/* SET PIN */}

      <div className="border rounded p-5 mb-6">

        {message && (
          <div className="bg-gray-100 p-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSetPin}>
          <div className=" relative flex justify-between">
            <input
              type={viewNewPin ? "tel" : "password"}
              maxLength="4"
              inputMode="numeric"
              placeholder="Enter PIN"
              className="w-full border p-2 mb-3 flex-1"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setSetPinData({
                  ...setPinData,
                  pin: value,
                })
              }}
              value={setPinData.pin}
            />
            <div className="absolute right-5  top-2 z-10 " onClick={() => setViewNewPin(!viewNewPin)}>
              {viewNewPin ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <input
            type={viewNewPin ? "text" : "password"}
            maxLength="4"
            inputMode="numeric"
            placeholder="Confirm PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setSetPinData({
                ...setPinData,
                confirmPin: value,
              })
            }}
            value={setPinData.confirmPin}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-sm transition text-white
                ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Saving..." : "Set PIN"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SetNewPin;
