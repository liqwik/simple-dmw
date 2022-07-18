export const capitalize = s => {
  if (typeof s !== 'string') return s;

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const removeFirstAndLastComma = path => {
  if (!path) return path;

  return path.substr(1).slice(0, -1);
};

export const formatSlugToName = slug => {
  if (!slug) return slug;

  return slug.replace(/_/g, ' ').replace(/and/g, '&');
};

export const changeCommaToSlash = str => {
  if (!str) return str;

  return str.replace(/,/g, ' / ');
};

export const displayValue = value => {
  if (!value) return 'គ្មានទិន្នន័យ';

  return value;
};

export const getUserFullName = user => {
  if (!user) return 'គ្មានទិន្នន័យ';

  return `${user.fn} ${user.ln}`;
};
