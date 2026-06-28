import { useState } from "react";
import { setNewPin } from "../../api/auth";
import { Eye, EyeClosed } from "lucide-react";

const SecurityAndPrivacy = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewNewPin, setViewNewPin] = useState(false)

  const [setPinData, setSetPinData] = useState({
    pin: "",
    confirmPin: "",
  });

  const [resetPinData, setResetPinData] = useState({
    oldPin: "",
    newPin: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


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

      // Send the correct PIN data
      const res = await setNewPin({
        pin: setPinData.pin
      });

      setMessage(res.data.message);
      setSetPinData({ pin: "", confirmPin: "" }); // Clear form
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

  // RESET PIN
  const handleResetPin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.put(
        "/security/reset-pin",
        resetPinData,
        config
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Unable to reset PIN"
      );
    } finally {
      setLoading(false);
    }
  };

  // CHANGE PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.put(
        "/security/change-password",
        {
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        },
        config
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Privacy & Security
      </h1>

      {message && (
        <div className="bg-gray-100 p-3 rounded mb-4">
          {message}
        </div>
      )}

      {/* SET PIN */}

      <div className="border rounded p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Set Transaction PIN
        </h2>

        <form onSubmit={handleSetPin}>
          <div className=" relative flex justify-between">
            <input
              type={viewNewPin ? "text" : "password"}
              maxLength="4"
              placeholder="Enter PIN"
              className="w-full border p-2 mb-3 flex-1"
              onChange={(e) =>
                setSetPinData({
                  ...setPinData,
                  pin: e.target.value,
                })
              }
            />
            <div className="absolute right-5  top-2 z-10 " onClick={() => setViewNewPin(!viewNewPin)}>
              {viewNewPin ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <input
            type={viewNewPin ? "text" : "password"}
            maxLength="4"
            placeholder="Confirm PIN"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setSetPinData({
                ...setPinData,
                confirmPin: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded"
          >
            {loading ? "saving" : "Save PIN"}
          </button>
        </form>
      </div>

      {/* RESET PIN */}

      <div className="border rounded p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Reset PIN
        </h2>

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
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Reset PIN
          </button>
        </form>
      </div>

      {/* CHANGE PASSWORD */}

      <div className="border rounded p-5">
        <h2 className="text-xl font-semibold mb-4">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 mb-3"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword:
                  e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SecurityAndPrivacy;
