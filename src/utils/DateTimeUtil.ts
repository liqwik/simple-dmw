import moment from 'moment';

const forDisplay = value => {
  if (!value) return value;

  return moment(value).format('DD/MM/YYYY hh:mm A');
};

const formatDate = value => moment(value).format('DD/MM/YYYY');
const formatTime = value => moment(value).format('hh:mm A');

const qsFormat = (value?) => moment(value).format('YYYY-MM-DD');

const DateTimeUtil = {
  forDisplay,
  qsFormat,
  formatDate,
  formatTime,
};

export default DateTimeUtil;
