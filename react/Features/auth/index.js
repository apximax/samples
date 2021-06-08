import { createSlice } from '@reduxjs/toolkit';
import { push, replace } from 'connected-react-router';

import Routes from 'App/constants/routes';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user,
    token,
  },
  reducers: {
    login: (state, action) => {
      const {user, token} = action.payload;

      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
});

export const {login, logout} = slice.actions;

export const loginAction = data => dispatch => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  dispatch(login(data));
  dispatch(push(Routes.HOME));
};

export const logoutAsync = () => async dispatch => {
  dispatch(replace(Routes.LOGIN));

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  dispatch(logout());
};

export const selectToken = state => state.auth.token;

export const selectUser = state => state.auth.user;

export default slice.reducer;
