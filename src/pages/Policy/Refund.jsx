import React from 'react'

import s from './common.module.scss'

function Refund() {
  return (
    <section className={s.container}>
      <h3>Refund Policy</h3>
      <div>
        <h5>Return and Exchanges</h5>
        <p>We have a 30 day return policy. You can submit a return within 30 days of receiving your purchase. Please be aware that returns and exchanges can only be processed once, and unless the products is damaged, the buyer will be responsible for all fees.</p>
        <p>Your item must be in its original packing, unworn or unused, with tags, and in the same condition as when you received it in order to be eligible for a return or exchange. The receipt or other evidence of purchase is also required.</p>
        <p>You can reach us at josevictorino003@gmail.com to begin a return. We will provide you with information on how and where to mail your package if your return is approved. We won't accept items that are returned to us without first requesting a return.</p>
      </div>
      <div>
        <h5>Issues and Damages</h5>
        <p>Inspect your order when it arrives, and get in touch with us within seven days if it is damaged, defective, or the wrong item. We'll assess the problem and resolve it.</p>
      </div>
      <div>
        <h5>Refund</h5>
        <p>Only damaged and out-of-stock items are eligible for refunds. Change of mind (e.g., incorrect size) will only be accepted with a return or exchange. To initiate a refund request, send us an email at josevictorino003@gmail.com. As soon as we get your request, we will let you know whether or not the refund was granted. If accepted, you will receive an automated refund within the following time frames, depending on your payment method:</p>
        <ul>
          <li>E-wallet and credit card refunds can take up to 4 business days to process and up to 7 business days to appear on your account.</li>
          <li>Debit card refunds can take up to 4 business days to process and up to 14 business days to appear on your account.</li>
        </ul>
      </div>
    </section>
  )
}

export default Refund