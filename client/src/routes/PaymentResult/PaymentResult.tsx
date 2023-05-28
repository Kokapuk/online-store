import classNames from 'classnames';
import styles from './PaymentResult.module.scss';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Route } from '../router';

export enum PaymentResultType {
  Success = 'Success',
  Failure = 'Failure',
}

interface Props {
  paymentResultType: PaymentResultType;
}

const PaymentResult = ({ paymentResultType }: Props) => {
  return (
    <div className={styles.container}>
      <h1
        className={classNames(
          styles.title,
          paymentResultType === PaymentResultType.Success ? styles.title__success : styles.title__failure
        )}>
        {paymentResultType === PaymentResultType.Success ? (
          <>
            Successful payment <HiOutlineCheckCircle />
          </>
        ) : (
          <>
            Failed payment <HiOutlineXCircle />
          </>
        )}
      </h1>
      <p className={styles.details}>
        {paymentResultType === PaymentResultType.Success
          ? 'Thanks for your purchase! Once your payment has been verified, the product will be added to your account. While a successful payment page indicates progress in the payment process, it does not serve as definitive proof of a completed and successful transaction, as various factors can still lead to payment failure or the need for reversals and refunds.'
          : 'Funds will not be debited, and the product will not be added to your account.'}
      </p>
      <Link to={Route.Home}>
        <button style={{ width: '100%' }} className='transparent'>
          Go home
        </button>
      </Link>
    </div>
  );
};

export default PaymentResult;
