import { useHistory } from 'react-router';

function useQueryString({ appRoute }) {
  const history = useHistory();

  const updateUriQuery = ({ q, fq, limit, page, sb }: any) => {
    let qs = `?page=${page}&limit=${limit}`;
    if (q) {
      qs += `&search=${q}`;
    }

    if (fq) {
      qs += `&fq=${fq}`;
    }

    if (sb) {
      qs += `&sort=${sb}`;
    }

    history.push({
      pathname: appRoute,
      search: qs,
    });
  };

  return [updateUriQuery];
}

export default useQueryString;
