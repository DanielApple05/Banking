import API from './axios';

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const setNewPin = (data) => API.post('/auth/set-pin', data);
export const resetPin = (data) => API.put('/auth/reset-pin', data);
export const changePassword = (data) => API.put('/auth/change-password', data);
export const RestorePin = (data) => API.put('/auth/restore-default-pin', data);