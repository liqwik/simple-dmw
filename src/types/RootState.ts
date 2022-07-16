import { CommonState } from 'app/pages/App/slice/types';
import { LoginState } from 'app/pages/AuthPage/slice/types';
import { CategoryState } from 'app/pages/CategoryPage/slice/types';
import { DocTypeState } from 'app/pages/DocTypePage/slice/types';
import { DocumentState } from 'app/pages/DocumentPage/slice/types';
import { InstitutionState } from 'app/pages/InstitutionPage/slice/types';
import { InternalUserState } from 'app/pages/InternalUserPage/slice/types';
import { UserState } from 'app/pages/UserPage/slice/types';

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login?: LoginState;
  common?: CommonState;
  category?: CategoryState;
  user?: UserState;
  internalUser?: InternalUserState;
  document?: DocumentState;
  docType?: DocTypeState;
  institution?: InstitutionState;
}
