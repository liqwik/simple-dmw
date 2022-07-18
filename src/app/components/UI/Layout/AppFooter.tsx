import React from 'react';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const { Footer } = Layout;

export function AppFooter() {
  const { t } = useTranslation();

  const getFullYear = React.useCallback(() => new Date().getFullYear(), []);

  return (
    <Footer style={{ textAlign: 'center' }}>
      <>
        {t(translations.appName)} © {getFullYear()}
      </>
    </Footer>
  );
}
