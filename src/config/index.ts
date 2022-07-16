const APIBase = process.env.REACT_APP_API_BASE || 'http://localhost:1337';
const APIBaseAdmin =
  process.env.REACT_APP_API_URL || 'http://localhost:1337/adm/v1';

const DEFAULT_LIMIT = 20;

export { APIBase, APIBaseAdmin, DEFAULT_LIMIT };
