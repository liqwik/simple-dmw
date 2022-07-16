import { APIBaseAdmin } from 'config';

export class ApiRoute {
  static get login() {
    return `${APIBaseAdmin}/bo/lg`;
  }

  static report() {
    return `${APIBaseAdmin}/reports`;
  }

  static category(id?: string) {
    const route = id ? `/categories/${id}` : '/categories';

    return `${APIBaseAdmin}${route}`;
  }

  static document(id?: string) {
    const route = id ? `/docs/${id}` : '/docs';

    return `${APIBaseAdmin}${route}`;
  }

  static docType(id?: string) {
    const route = id ? `/doc-types/${id}` : '/doc-types';

    return `${APIBaseAdmin}${route}`;
  }

  static institution(id?: string) {
    const route = id ? `/institutions/${id}` : '/institutions';

    return `${APIBaseAdmin}${route}`;
  }

  static internalUser(id?: string) {
    const route = id ? `/internal-users/${id}` : '/internal-users';

    return `${APIBaseAdmin}${route}`;
  }

  static user(id?: string) {
    const route = id ? `/users/${id}` : '/users';

    return `${APIBaseAdmin}${route}`;
  }
}
