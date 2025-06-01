import React, { useState } from "react";
import { useContext } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);

    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //step 1.  backend or functions ....> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`
      });
      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;

      //step 2. client side (react confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      //  console.log(paymentIntent);

      //step 3. after the confirmation...> order firebase database save, clear basket

      await db
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });

      setProcessing(false);
      navigate("/auth", { state: { msg: "You have to login to pay" } });
    } catch (error) {

      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>
        Check out ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* addresses */}
        <div className={classes.payment_flex}>
          <h3> Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>Street 123</div>
            <div>Shashemene</div>
          </div>
        </div>
        <hr />

        {/* Products */}

        <div className={classes.payment_flex}>
          <h3> Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form */}
        <div className={classes.payment_flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card elemnt */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait ... </p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;

