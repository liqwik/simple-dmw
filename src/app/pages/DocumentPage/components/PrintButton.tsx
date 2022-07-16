import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const PrintButton: React.FC<any> = ({ onPrint }) => {
  return (
    <Button type="text" block icon={<PrinterOutlined />} onClick={onPrint}>
      បោះពុម្ព
    </Button>
  );
};

export default PrintButton;
