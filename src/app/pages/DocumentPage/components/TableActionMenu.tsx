import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import EditButton from './EditButton';
import DownloadButton from './DownloadButton';
import PrintButton from './PrintButton';
import { useSelector } from 'react-redux';
import { selectLogin } from 'app/pages/AuthPage/slice/selectors';

function TableActionMenu({ editRoute, downloadSrc, onPrintDoc }) {
  const { isAdmin } = useSelector(selectLogin);

  return (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu>
          {!isAdmin && (
            <>
              <Menu.Item key="0">
                <PrintButton onPrint={onPrintDoc} />
              </Menu.Item>
              <Menu.Item key="1">
                <DownloadButton src={downloadSrc} />
              </Menu.Item>
              <Menu.Divider />
            </>
          )}
          <Menu.Item key="2">
            <EditButton to={editRoute} />
          </Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="text" block className="btn-action" icon={<MoreOutlined />} onClick={e => e.preventDefault()}>
        <span>សកម្មភាព</span>
      </Button>
    </Dropdown>
  );
}

export default TableActionMenu;
