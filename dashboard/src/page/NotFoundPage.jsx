// libs
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// assets

// components

const NotFoundPage = () => {
    const { t } = useTranslation();  // useTranslation hook;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">{t('txtNotFoundPage')}</p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
                {t('txtRouteHome')}
            </Link>
        </div>
    );
}

export default NotFoundPage;