import API from './axios';

export const getTransactions = () => API.get('/transactions');
export const getBalance = () => API.get('/transactions/balance');
export const sendTransfer = (data) => API.post('/transactions/transfer', data);
export const lookupAccount = (accountNumber) => API.get(`/transactions/lookup/${accountNumber}`);