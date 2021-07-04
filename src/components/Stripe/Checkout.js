import React from 'react';
import axios from 'axios'
import './normalize.css';
import './global.css';

const Checkout = () => {
  const createCheckoutSession = async e => {
    console.log(e)
      e.preventDefault()
      await axios
        .post('/create-checkout-session')
        .then(res => {
          console.log({ res })
        })
        .catch(err => {
          console.log({ err })
        }) 
  }

  return (
    <div className="sr-root">
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>

          <button onClick={e => createCheckoutSession(e)}>Buy</button>
          {/* <form action="/create-checkout-session" method="POST">
            <button role="link">Buy</button>
          </form> */}
        </section>
      </div>
    </div>
  );
};

export default Checkout;
