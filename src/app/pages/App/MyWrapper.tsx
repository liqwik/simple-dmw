import * as React from 'react';
import { Modal } from 'antd';
import { AppStorage } from 'utils';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectCommon } from './slice/selectors';
import { useCommonSlice } from './slice';
import AppRoute from 'utils/AppRoute';

export function MyWrapper({ children }) {
  useCommonSlice();
  const history = useHistory();
  const { status } = useSelector(selectCommon);

  React.useEffect(() => {
    if (status === 401 || status === 403) {
      const errorModal = Modal.error({});

      if (status === 401) {
        errorModal.update({
          title: 'Unauthorized',
          content: (
            <div>
              <p>
                It appears that you don't have permission to access this page. Pleaes make sure you're authorized to
                view this content.
              </p>
              <p>
                If you think you should be able to view this page, please contact administrator for resolve this issue.
              </p>
            </div>
          ),
          onOk() {
            AppStorage.removeAuthData(true);
          },
        });
      } else if (status === 403) {
        errorModal.update({
          title: 'Forbidden',
          content: (
            <div>
              <p>You don't have permission to access this page.</p>
            </div>
          ),
          onOk() {
            history.replace(AppRoute.dashboard);
          },
        });
      }
    }

    return () => {
      Modal.destroyAll();
    };
  }, [status, history]);

  return children;
}
