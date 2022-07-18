import { DOC_STATUS } from 'utils/constants';

const TableRowClassName = (record, _idx) => {
  const { docStatus } = record;

  if (docStatus === DOC_STATUS.normal) {
    return 'doc-row-normal';
  }

  if (docStatus === DOC_STATUS.signature) {
    return 'doc-row-signature';
  }

  if (docStatus === DOC_STATUS.urgent) {
    return 'doc-row-urgent';
  }

  return '';
};

export default TableRowClassName;
