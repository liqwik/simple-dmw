import { useDocTypeSlice } from 'app/pages/DocTypePage/slice';
import { selectDocType } from 'app/pages/DocTypePage/slice/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useDocType() {
  const dispatch = useDispatch();
  const { actions } = useDocTypeSlice();
  const { items, totalItem } = useSelector(selectDocType);

  useEffect(() => {
    dispatch(actions.getListAction({}));
  }, [actions, dispatch]);

  return [items, totalItem];
}

export default useDocType;
