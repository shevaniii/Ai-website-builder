import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginUser, registerUser, logout, loadUser } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, isAuthenticated, error } = useSelector(state => state.auth);

  const login = useCallback((credentials) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);

  const register = useCallback((userData) => {
    return dispatch(registerUser(userData));
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const loadCurrentUser = useCallback(() => {
    return dispatch(loadUser());
  }, [dispatch]);

  return {
    // State
    user,
    token,
    isLoading,
    isAuthenticated,
    error,
    
    // Actions
    login,
    register,
    logout: logoutUser,
    loadUser: loadCurrentUser,
  };
};