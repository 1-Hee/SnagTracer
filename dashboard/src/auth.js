// auth.js
import Cookies from 'js-cookie';

const TOKEN_KEY = 'jwt_token';

export function login(token) {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1일 유효
}

export function logout() {
  Cookies.remove(TOKEN_KEY);
  // window.location.reload();
}

export function isAuthenticated() {
  return !!Cookies.get(TOKEN_KEY);
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}
