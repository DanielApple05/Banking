import { useState } from "react";
import { changePassword } from "../../../api/auth";
import { Eye, EyeClosed } from "lucide-react";

const ChangePassword = () => {

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [viewPassword, setViewPassword] = useState(false)

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
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return setPasswordMsg("All fields are required.");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordMsg("Passwords do not match.");
    }
    if (passwordData.newPassword.length < 6) {
      return setPasswordMsg("Password must be at least 6 characters.");
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await changePassword(passwordData);

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to change password"
      );
    } finally {
      setLoading(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
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
          <div className=" relative flex justify-between">
            <input
              type={viewPassword ? "text" : "password"}
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
            <div className="absolute right-5  top-2 z-10 " onClick={() => setViewPassword(!viewPassword)}>
              {viewPassword ? <Eye /> : <EyeClosed />}
            </div>
          </div>
          <input
            type={viewPassword ? "text" : "password"}
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
            type={viewPassword ? "text" : "password"}
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
