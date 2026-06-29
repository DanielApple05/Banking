import { useState } from "react";
import { changePassword } from "../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";

const ChangePassword = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewNewPin, setViewNewPin] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <>
      <div className="border rounded p-5">
        <h2 className="text-xl font-semibold mb-4">
          Change Password
        </h2>

        {message && (
          <div className="bg-gray-100 p-3 rounded mb-4">
            {message}
          </div>
        )}

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
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-sm transition text-white
                ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "please wait..." : "Change Password"}
            </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
