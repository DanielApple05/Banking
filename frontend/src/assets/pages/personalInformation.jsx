import { ArrowLeft, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-5 pt-12 pb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Personal Information</h1>
          <div className="w-9" />
        </div>
      </div>

      {/* Coming soon content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-10">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <User className="w-7 h-7 text-blue-500" />
        </div>

        <h2 className="text-base font-bold text-gray-900 mb-2">
          Coming soon
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
          You'll soon be able to update your name, email, and other personal
          details right here.
        </p>

        <div className="flex items-center gap-1.5 mt-5 bg-gray-200 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500 font-semibold">In development</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
