
export const getToken = () => localStorage.getItem('token');

export const requireAuth = (navigate) => {
  const token = getToken();
  if (!token) {
    navigate('/');
    return false;
  }
  return true;
};