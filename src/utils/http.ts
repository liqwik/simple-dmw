export const querystring = (query = {}) => {
  const qs = Object.keys(query)
    .map(key => key + '=' + query[key])
    .join('&');

  return qs ? `?${qs}` : qs;
};

export const getQueryParams = url => {
  const sp = new URLSearchParams(url);

  return {
    get: key => sp.get(key),
  };
};

export const queryStringToFieldFilter = filter => {
  if (!filter && Object.keys(filter).length === 0) return filter;

  const filterResult: string[] = [];

  Object.keys(filter).forEach(key => {
    const fieldValue = filter[key];

    if (fieldValue && fieldValue.length > 0) {
      const filterValue = `${key}:${fieldValue[0]}`;
      filterResult.push(filterValue);
    }
  });

  return filterResult.join(',');
};

export const hasFieldFilter = filter =>
  filter && Object.keys(filter).length > 0;
