import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Row, Col } from 'antd';
import { UserDropdown } from '../../components/UI/Dropdown/UserDropdown';
import { UserFormModal } from '../User/UserFormModal';
import { userService } from 'services';
import ObjectUtil from 'utils/ObjectUtil';
import { ITEM_LIMIT } from 'utils/constants';

type UserDropdownProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  selectedValue: any;
  onSelectedValue: (id: string) => void;
  [props: string]: any;
};

function UserDropdownContainer({
  name,
  label,
  placeholder,
  type,
  selectedValue,
  onSelectedValue,
  ...props
}: UserDropdownProps) {
  const [visible, setVisible] = useState(false);
  const [queryParams, setQueryParams] = useState({
    userType: type,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetchUser(queryParams);
  }, [queryParams]);

  const fetchUser = async ({ page, userType }) => {
    setIsLoading(true);
    const result = await userService.getAll(
      ObjectUtil.cleanObjectValue({
        fq: `userType:${userType}`,
        page,
      }),
    );

    if (result.length < ITEM_LIMIT) {
      setHasNextPage(false);
    }

    setUsers(prev => [...prev, ...result]);
    setIsLoading(false);
  };

  const showForm = () => {
    setVisible(true);
  };

  const handleCloseForm = () => {
    setVisible(false);
  };

  const handleLoadmore = e => {
    e.persist();
    const target: any = e.target;

    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      !isLoading &&
      hasNextPage
    ) {
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  };

  const handleSubmitResult = values => {
    setUsers([{ ...values, id: users.length + 1 }, ...users]);
    setVisible(false);
  };

  return (
    <>
      <Form.Item noStyle>
        <Row>
          <Col flex="auto">
            <UserDropdown
              items={users}
              name={name}
              placeholder={placeholder}
              onLoadmore={handleLoadmore}
            />
          </Col>
          <Col flex="50px">
            <Button type="primary" onClick={showForm}>
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <UserFormModal
        visible={visible}
        type={type}
        onResult={handleSubmitResult}
        onCancel={handleCloseForm}
      />
    </>
  );
}

export default UserDropdownContainer;
