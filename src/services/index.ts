import ClientHttp from 'lib/http/ClientHttp';
import AuthService from './AuthService';
import CategoryService from './CategoryService';
import UserService from './UserService';
import InternalUserService from './InternalUserService';
import DocumentService from './DocumentService';
import DocTypeService from './DocTypeService';
import InstitutionService from './InstitutionService';
import ReportService from './ReportService';

const http = ClientHttp.getInstance();

export const authService = new AuthService(http);
export const categoryService = new CategoryService(http);
export const userService = new UserService(http);
export const internalUserService = new InternalUserService(http);
export const documentService = new DocumentService(http);
export const docTypeService = new DocTypeService(http);
export const institutionService = new InstitutionService(http);
export const reportService = new ReportService(http);
