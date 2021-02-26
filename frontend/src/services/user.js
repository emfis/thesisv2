export function isLoggedIn() {
  return !!window.sessionStorage.getItem('token');
}