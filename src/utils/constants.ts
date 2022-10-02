export const UPLOADING = 'uploading';
export const DONE = 'done';

export const DEFAULT_IMG = 'https://via.placeholder.com/300';

export const ITEM_LIMIT = 20;

export const STATUS = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
  uploading: 'uploading',
  done: 'done',
};

export const docStatus = {
  badge: {
    normal: 'blue',
    signature: 'success',
    urgent: 'error',
  },
  label: {
    normal: 'ឯកសារធម្មតា',
    signature: 'ឯកសារបានចាររួច',
    urgent: 'ប្រញាប់ ឬ ជិតដល់ថ្ងៃកំណត់',
  },
};

export const DOC_STATUS = {
  normal: 'normal',
  signature: 'signature',
  urgent: 'urgent',
};

export const listViewMode = {
  TABLE: 'table',
  CARD: 'card',
};

export const ROLES = {
  admin: 'admin',
  assistant: 'assistant',
  officer: 'officer',
};

export const permissions = {
  admin: '*',
  assistant: {
    dashboard: ['create', 'edit', 'view', 'delete'],
  },
  officer: {},
};
