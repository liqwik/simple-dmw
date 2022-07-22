import moment from 'moment';
import momentkh from '@thyrith/momentkh';

const momentLunar = momentkh(moment);

const forDisplay = value => {
  if (!value) return value;

  return moment(value).format('DD/MM/YYYY hh:mm A');
};

const formatDate = value => moment(value).format('DD/MM/YYYY');
const formatTime = value => moment(value).format('hh:mm A');

const qsFormat = (value?) => moment(value).format('YYYY-MM-DD');

const formatLunarDate = value => {
  if (typeof value === 'string') {
    return momentLunar(value).toLunarDate();
  }

  return value.toLunarDate();
};

const DateTimeUtil = {
  forDisplay,
  qsFormat,
  formatDate,
  formatTime,
  formatLunarDate,
};

export default DateTimeUtil;
