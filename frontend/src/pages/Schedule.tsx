import { useTranslation } from 'react-i18next';

const Schedule = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
      <p className="text-2xl text-gray-400 font-medium">{t('pages.schedule')}</p>
    </div>
  );
};

export default Schedule;
