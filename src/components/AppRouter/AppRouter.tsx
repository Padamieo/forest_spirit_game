import { FC } from 'react';
import { Providers } from '../Providers';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

export const AppRouter: FC = () => (
  <Providers>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Providers>
);

export default AppRouter;
