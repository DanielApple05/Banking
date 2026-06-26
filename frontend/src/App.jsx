import Login from './assets/pages/login'
import Dashboard from './assets/pages/dashboard';
import Transfer from './assets/pages/transfer';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import ReviewTransfer from './assets/pages/reviewTransfer';
import ConfirmTransfer from './assets/pages/confirmTransfer';
import TransferSuccess from './assets/pages/transfer-success';
import TransferFailed from './assets/pages/transferFailed';
import Transactions from './assets/pages/transactions';
import Notifications from './assets/pages/notifications';
import ProtectedRoute from './assets/components/protectedRoute';
import AdminDashboard from './assets/pages/admin';



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
        <Route />
      </Routes>
    </>
  )
}

export default App
