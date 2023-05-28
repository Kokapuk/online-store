import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

const App = () => {
  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
