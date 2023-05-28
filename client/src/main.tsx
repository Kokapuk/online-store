import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
