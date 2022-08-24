export class AppStorage {
  static getAuthData() {
    const authData = localStorage.getItem('t');

    return authData ? JSON.parse(authData) : null;
  }

  static setAuthData(data) {
    localStorage.setItem('t', JSON.stringify(data));
  }

  static getUser() {
    const user = localStorage.getItem('t');

    if (!user) return null;

    const { fn, ln, usr, permissions, isAdmin } = JSON.parse(user);

    return {
      fn,
      ln,
      usr,
      isAdmin,
      permissions,
    };
  }

  static removeAuthData(isRefresh) {
    localStorage.removeItem('t');

    if (isRefresh) {
      window.location.reload();
    }
  }

  static getUserToken() {
    return this.getAuthData() ? this.getAuthData().t : '';
  }

  static setViewMode(value) {
    localStorage.setItem('viewMode', value);
  }

  static getViewMode() {
    return localStorage.getItem('viewMode');
  }

  static setLang(value) {
    localStorage.setItem('lang', value);
  }

  static getLang() {
    return localStorage.getItem('lang');
  }
}
