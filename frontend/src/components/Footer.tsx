import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white py-4 text-center text-gray-400 text-sm border-t border-gray-200 z-50 shadow-inner">
      <p>{t('footer.text')}</p>
    </footer>
  );
};

export default Footer;