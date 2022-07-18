import { useUserSlice } from 'app/pages/UserPage/slice';
import { selectUser } from 'app/pages/UserPage/slice/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useUser({ type }: any) {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { actions } = useUserSlice();
  const { items, isLoading, hasNextPage, validationErrors } = useSelector(selectUser);

  useEffect(() => {
    dispatch(
      actions.getListAction({
        fq: `userType:${type}`,
        page,
      }),
    );
  }, [actions, dispatch, type, page]);

  const dispatchAddAction = data => {
    dispatch(actions.addAction(data));
  };

  return {
    items,
    isLoading,
    hasNextPage,
    dispatchAddAction,
    validationErrors,
    setPage,
  };
}

export default useUser;
