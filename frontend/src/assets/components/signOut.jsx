import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SignOut = () => {
  const navigate = useNavigate()
  localStorage.removeItem('token')
  navigate('/')
}


