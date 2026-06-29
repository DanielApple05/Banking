import { useState } from "react";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = {
  terms: [
    {
      title: "Acceptance of Terms",
      body: "By creating a SecureBank account or using any of our services, you confirm that you have read, understood, and agreed to these Terms of Service. If you do not agree, you may not access or use SecureBank. We may update these terms from time to time — continued use of the app after any change constitutes your acceptance of the revised terms.",
    },
    {
      title: "Eligibility",
      body: "You must be at least 18 years old and legally capable of entering into binding agreements to use SecureBank. By registering, you represent that all information you provide is accurate, current, and complete. SecureBank reserves the right to suspend or terminate any account found to have provided false or misleading information.",
    },
    {
      title: "Account Responsibilities",
      body: "You are solely responsible for maintaining the confidentiality of your login credentials, transaction PIN, and any security codes associated with your account. Do not share these with anyone, including SecureBank staff — we will never ask for your PIN or password. You agree to notify us immediately if you suspect any unauthorised access to your account.",
    },
    {
      title: "Transfers & Transactions",
      body: "All fund transfers initiated through SecureBank are final once confirmed with your transaction PIN. SecureBank is not liable for transfers made to incorrect account numbers entered by you. Please verify recipient details carefully before confirming any transaction. Transactions flagged as suspicious may be held for review under our fraud prevention policy.",
    },
    {
      title: "Prohibited Activities",
      body: "You agree not to use SecureBank for any unlawful purpose, including money laundering, fraud, financing of illegal activities, or any activity that violates applicable financial regulations. Attempts to reverse-engineer, scrape, or compromise any part of the platform are strictly prohibited and may result in immediate account termination and legal action.",
    },
    {
      title: "Service Availability",
      body: "We strive to keep SecureBank available at all times, but we do not guarantee uninterrupted access. Scheduled maintenance, technical issues, or circumstances beyond our control may result in temporary downtime. SecureBank is not liable for any loss arising from service unavailability.",
    },
    {
      title: "Limitation of Liability",
      body: "To the fullest extent permitted by law, SecureBank and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including loss of funds resulting from user error, unauthorised access due to credential compromise, or reliance on information provided within the app.",
    },
    {
      title: "Termination",
      body: "SecureBank may suspend or permanently close your account at any time if we determine that you have violated these terms, engaged in fraudulent activity, or pose a risk to other users or the platform. You may also close your account at any time by contacting support, provided there are no pending transactions or outstanding obligations.",
    },
  ],
  privacy: [
    {
      title: "Information We Collect",
      body: "When you register, we collect your name, email address, and account credentials. When you transact, we log the amount, recipient, timestamp, and device metadata. We do not collect or store your transaction PIN in readable form — it is hashed using industry-standard encryption before being saved.",
    },
    {
      title: "How We Use Your Information",
      body: "We use your information to operate your account, process transactions, send you notifications about activity on your account, and detect fraud. We may also use anonymised, aggregated data to improve our services. We do not sell your personal data to third parties.",
    },
    {
      title: "Data Storage & Security",
      body: "Your data is stored on secured servers protected by encryption at rest and in transit. Access to production data is restricted to authorised personnel only. While we implement strong security measures, no system is completely immune to risk — we encourage you to use a strong, unique password and enable all available security features.",
    },
    {
      title: "Sharing Your Information",
      body: "We do not sell, rent, or trade your personal information. We may share data with service providers who assist in operating the platform (such as cloud infrastructure providers), strictly under confidentiality agreements. We may also disclose information when required by law, court order, or to protect the rights and safety of users.",
    },
    {
      title: "Cookies & Local Storage",
      body: "SecureBank uses browser local storage to maintain your session and remember your preferences between visits. We do not use third-party tracking cookies or advertising pixels. You can clear stored data at any time through your browser or device settings, though this will sign you out.",
    },
    {
      title: "Your Rights",
      body: "You have the right to access the personal data we hold about you, request corrections, or ask us to delete your account and associated data. To exercise any of these rights, contact our support team. We will respond to all verified requests within 30 days.",
    },
    {
      title: "Changes to This Policy",
      body: "We may update this Privacy Policy as our services evolve or regulations change. When we do, we will notify you via the app or the email address on your account. The date at the top of this document always reflects when it was last revised.",
    },
  ],
};

const TermsAndPrivacy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("terms");
  const [expanded, setExpanded] = useState(null);

  const toggle = (i) => setExpanded(expanded === i ? null : i);
  const content = sections[activeTab];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-5 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Legal</h1>
          <div className="w-9" />
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white/15 rounded-2xl p-1 gap-1">
          <button
            onClick={() => { setActiveTab("terms"); setExpanded(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition
              ${activeTab === "terms" ? "bg-white text-blue-700 shadow-sm" : "text-white/80 hover:text-white"}`}
          >
            <FileText className="w-4 h-4" />
            Terms of Service
          </button>
          <button
            onClick={() => { setActiveTab("privacy"); setExpanded(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition
              ${activeTab === "privacy" ? "bg-white text-blue-700 shadow-sm" : "text-white/80 hover:text-white"}`}
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-5 py-6">

        <p className="text-xs text-gray-400 font-medium mb-1">
          Last updated: June 2025
        </p>

        {content.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-4 py-4 text-left"
            >
              <span className="text-sm font-semibold text-gray-900">{section.title}</span>
              <span className={`text-blue-500 text-lg font-light leading-none transition-transform duration-200 ${expanded === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            {expanded === i && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed pt-3">
                  {section.body}
                </p>
              </div>
            )}
          </div>
        ))}

        <p className="text-center text-xs text-gray-400 mt-4 px-4 leading-relaxed">
          Questions? Contact us at{" "}
          <span className="text-blue-500 font-medium">support@securebank.com</span>
        </p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
