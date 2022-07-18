import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function DateFilter({ ...props }: any) {
  return (
    <RangePicker
      ranges={{
        ថ្ងៃនេះ: [moment(), moment()],
        សប្តាហ៍នេះ: [moment().startOf('week'), moment().endOf('week')],
        ខែមុន: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        ខែនេះ: [moment().startOf('month'), moment().endOf('month')],
        ឆ្នាំនេះ: [moment().startOf('year'), moment().endOf('year')],
      }}
      {...props}
    />
  );
}

export default DateFilter;
