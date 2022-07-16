import { useInstitutionSlice } from 'app/pages/InstitutionPage/slice';
import { selectInstitution } from 'app/pages/InstitutionPage/slice/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useInstitution() {
  const dispatch = useDispatch();
  const { actions } = useInstitutionSlice();
  const { items, totalItem, validationErrors } = useSelector(selectInstitution);

  useEffect(() => {
    dispatch(actions.getListAction({}));
  }, [actions, dispatch]);

  const dispatchAddAction = data => {
    dispatch(actions.addAction(data));
  };

  return { items, totalItem, dispatchAddAction, validationErrors };
}

export default useInstitution;
