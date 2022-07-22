export class AppStorage {
  static getAuthData() {
    const authData = localStorage.getItem('t');

    return authData ? JSON.parse(authData) : null;
  }

  static setAuthData(data) {
    localStorage.setItem('t', JSON.stringify(data));
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
}
