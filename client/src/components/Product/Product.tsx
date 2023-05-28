import styles from './Product.module.scss';
import { Product as ProductType } from '../../types';
import { useState } from 'react';
import axios from '../../services/axios';
import useToken from '../../hooks/useToken';

interface Props {
  product: ProductType;
  owned?: boolean;
  quantity?: number;
}

const Product = ({ product, owned, quantity }: Props) => {
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [token] = useToken();
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const getFormattedPrice = () => (
    <strong>{((product.price * quantityToBuy) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>
  );

  const handleBuyClick = async () => {
    try {
      setPaymentLoading(true);
      const response = await axios.post(
        `/products/${product._id}`,
        { quantity: quantityToBuy },
        { headers: { Authorization: token } }
      );

      window.location.href = response.data.url;
    } catch (err) {
      console.log(err);
      setPaymentLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img draggable={false} className={styles.image} src={product.imageUrl} />
      <h3 className={styles.title}>
        {product.name}
        {owned && quantity && ' x' + quantity}
      </h3>
      {owned ? (
        <p>{getFormattedPrice()} each</p>
      ) : (
        <div className={styles['button-container']}>
          <button disabled={isPaymentLoading} onClick={handleBuyClick} style={{ width: '100%' }}>
            {getFormattedPrice()} for x{quantityToBuy}
          </button>
          <button onClick={() => setQuantityToBuy((prev) => prev + 1)} disabled={isPaymentLoading || quantityToBuy >= 5}>
            +
          </button>
          <button onClick={() => setQuantityToBuy((prev) => prev - 1)} disabled={isPaymentLoading || quantityToBuy <= 1}>
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
