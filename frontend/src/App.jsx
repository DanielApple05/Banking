import Login from './assets/pages/login'
import Dashboard from './assets/pages/dashboard';
import Transfer from './assets/pages/transfer';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import ReviewTransfer from './assets/pages/reviewTransfer';
import ConfirmTransfer from './assets/pages/confirmTransfer';
import TransferSuccess from './assets/pages/transfer-success';
import TransferFailed from './assets/pages/transfer-failed';
import Transactions from './assets/pages/transactions';
import Notifications from './assets/pages/notifications';
import ProtectedRoute from './assets/components/protectedRoute';
import AdminDashboard from './assets/pages/admin';
import Profile from './assets/pages/profile';
import SecurityAndPrivacy from './assets/pages/security-and-privacy';
import HelpCenter from './assets/pages/helpCenter';
import TermsAndPrivacy from './assets/pages/terms-privacy';
import PersonalInformation from './assets/pages/personalInformation';
import Reciept from './assets/pages/reciept';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/help" element={<HelpCenter/>} />
        {/* protected route */}
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/review-transfer" element={<ReviewTransfer />} />
        <Route path="/confirm-transfer" element={<ConfirmTransfer />} />
        <Route path="/transfer-success" element={<TransferSuccess />} />
        <Route path="/transfer-failed" element={<TransferFailed />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/security-and-privacy" element={<SecurityAndPrivacy />} /> 
        <Route path="/legal" element={<TermsAndPrivacy />} /> 
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route path="/receipt" element={<Reciept />} />
        <Route />
      </Routes>
    </>
  )
}

export default App
