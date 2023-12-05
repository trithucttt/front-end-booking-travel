import { useSelector } from 'react-redux';
import { selectCart } from '../../reduxProvider/cartSlice';
import styles from './checkout.module.css';
function Checkout(){
const {totalPrice} = useSelector(selectCart);
const checkoutInfo = useSelector((state) => state.cart.checkoutInfo);
const payment = useSelector((state) => state.cart.paymentOption);
console.log(totalPrice);
console.log(checkoutInfo);
console.log(payment);
    return(
        <div className={styles.container}>
        <article className={styles.checkout}>
          <table className={styles.checkoutTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {checkoutInfo.map((item, index) => (
                <tr key={item.id}>
                  <td><img
                className={styles.imageItems}
                alt=""
                src={`http://localhost:8086/api/cart/upload/imageCart/${item.id}`}
              /></td>
                  <td>{item.productName}</td>
                  <td>{item.location}</td>
                  <td>{item.quantity}</td>
                  <td>{item.priceTour}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.summary}>
            <div>Total Price: {totalPrice}</div>
            <div>Payment Option: {payment}</div>
          </div>
        </article>
      </div>
    )
}
export default Checkout;