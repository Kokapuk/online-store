import { useEffect } from 'react';
import { HiArrowLeft } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from '../../components/Product/Product';
import useToken from '../../hooks/useToken';
import { useGetMeQuery } from '../../services/auth';
import { useGetAllQuery } from '../../services/purchases';
import { Route } from '../router';
import styles from './Profile.module.scss';

const Profile = () => {
  const [token, setToken] = useToken();
  const { data: user } = useGetMeQuery(token);
  const navigate = useNavigate();
  const { data: purchases, isLoading: isPurchasesLoading } = useGetAllQuery(token);

  useEffect(() => {
    if (!user || !token) {
      navigate(Route.SignUp);
    }
  }, [user, token]);

  return (
    <div>
      <header className={styles.header}>
        <Link to={Route.Home}>
          <button className='transparent'>
            <HiArrowLeft />
          </button>
        </Link>
        <h2>{token && user?.login}</h2>
        <button onClick={() => setToken('')} className='danger'>
          Sign Out
        </button>
      </header>
      <div className='grid'>
        {isPurchasesLoading ? (
          <p>Loading...</p>
        ) : (
          purchases!.map((purchase) => (
            <ProductItem owned key={purchase.product._id} product={purchase.product} quantity={purchase.quantity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
