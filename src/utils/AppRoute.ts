class AppRoute {
  static login = '/login';
  static baseUrl = '/backoffice';

  private static withBaseRoute(route) {
    return `${this.baseUrl}/${route}`;
  }

  static get dashboard() {
    return this.withBaseRoute('dashboard');
  }

  static get category() {
    return this.withBaseRoute('category');
  }

  static get document() {
    return this.withBaseRoute('document');
  }

  static get docType() {
    return this.withBaseRoute('doc-type');
  }

  static get institution() {
    return this.withBaseRoute('institution');
  }

  static get internalUser() {
    return this.withBaseRoute('internal-user');
  }

  static get user() {
    return this.withBaseRoute('user');
  }
}

export default AppRoute;
