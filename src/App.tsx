import { useRoutes, useNavigate } from 'react-router-dom';
import './App.css';
import { Canvas } from './components/Canvas';
import { cloneElement, useEffect } from 'react';
import { Settings } from './pages/Settings';
import { useLanguage } from './i18n';

function App() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const settings = () => {
    navigate('/settings');
  };

  useEffect(() => {
    navigate('/');
  }, []);

  const element = useRoutes([
    {
      index: true,
      element: (
        <div className="container">
          <h1>{t('Landing.main.title')}</h1>
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          <button onClick={settings}>{t('Landing.button.link.settings')}</button>
          <Canvas />
        </div>
      ),
    },
    {
      path: '/level',
      element: <p>TBD</p>,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
  ]);

  if (!element) {
    return null;
  }

  return element && cloneElement(element, { key: location.pathname });
}

export default App;
