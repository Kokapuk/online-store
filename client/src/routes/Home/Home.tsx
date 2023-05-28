import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ProductItem from '../../components/Product/Product';
import useToken from '../../hooks/useToken';
import { useGetMeQuery } from '../../services/auth';
import { useGetAllQuery } from '../../services/products';
import { Route } from '../router';
import styles from './Home.module.scss';

const Home = () => {
  const [token] = useToken();
  const { data: user } = useGetMeQuery(token);
  const { data: products, isLoading: isProductsLoading } = useGetAllQuery();

  return (
    <>
      {token && user ? (
        <Link to={Route.Profile}>
          <button className={classNames('transparent', styles['header-button'])}>My Profile</button>
        </Link>
      ) : (
        <>
          <Link to={Route.SignUp}>
            <button className={classNames('transparent', styles['header-button'])}>Sign Up</button>
          </Link>
          <Link to={Route.SignIn}>
            <button className={classNames('transparent', styles['header-button'])}>Sign In</button>
          </Link>
        </>
      )}
      <div className='grid'>
        {isProductsLoading ? <p>Loading...</p> : products!.map((product) => <ProductItem key={product._id} product={product} />)}
      </div>
    </>
  );
};

export default Home;
