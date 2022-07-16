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

export const formatCurrency = (value, symbol = '$') =>
  `${symbol}${formatThousand(value.toFixed(2))}`;

export const formatThousand = x => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// export const formatDateTime = dateStr => {
//   const date = new Date(dateStr);

//   const days = date.getDate();
//   const months = date.getMonth();
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   let minutes = date.getMinutes();

//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   const minutesString = minutes < 10 ? '0' + minutes : minutes;
//   const strTime = hours + ':' + minutesString + ampm;

//   // return `${enMonthsArr[months]} ${days}, ${year} ${strTime}`;
// };

export const displayValue = value => {
  if (!value) return 'គ្មានទិន្នន័យ';

  return value;
};

export const getUserFullName = user => {
  if (!user) return 'គ្មានទិន្នន័យ';

  return `${user.fn} ${user.ln}`;
};
