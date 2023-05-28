import { createBrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Auth, { AuthType } from './Auth/Auth';
import Profile from './Profile/Profile';
import PaymentResult, { PaymentResultType } from './PaymentResult/PaymentResult';

export enum Route {
  Home = '/',
  SignUp = '/signup',
  SignIn = '/signin',
  Profile = '/profile',
  PaymentResultSuccess = '/payment_result_success',
  PaymentResultFailure = '/payment_result_failure',
}

const router = createBrowserRouter([
  {
    path: Route.Home,
    element: <Home />,
  },
  {
    path: Route.SignUp,
    element: <Auth authType={AuthType.SignUp} />,
  },
  {
    path: Route.SignIn,
    element: <Auth authType={AuthType.SignIn} />,
  },
  {
    path: Route.Profile,
    element: <Profile />,
  },
  {
    path: Route.PaymentResultSuccess,
    element: <PaymentResult paymentResultType={PaymentResultType.Success} />,
  },
  {
    path: Route.PaymentResultFailure,
    element: <PaymentResult paymentResultType={PaymentResultType.Failure} />,
  },
]);

export default router;
