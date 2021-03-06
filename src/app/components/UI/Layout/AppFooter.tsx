import React from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

export function AppFooter() {
  const { t } = useTranslation();

  const getFullYear = React.useCallback(() => new Date().getFullYear(), []);

  return (
    <Footer style={{ textAlign: 'center' }}>
      {t(translations.appName)} © {getFullYear()}
    </Footer>
  );
}
