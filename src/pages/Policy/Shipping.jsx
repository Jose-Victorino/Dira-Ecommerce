import React from 'react'

import s from './common.module.scss'

function Shipping() {
  return (
    <section className={s.container}>
      <h3>Shipping Policy</h3>
      <p>We aim to deliver your orders quickly, securely, and with clear expectations. This policy outlines our shipping methods, delivery timelines, and key guidelines.</p>
      <div>
        <h5>Shipping Coverage</h5>
        <p>We offer both local and international shipping</p>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Delivery Fee</th>
              <th>Estimated delivery time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Metro Manila</td>
              <td>
                <ul>
                  <li>Starts at ₱100 for the first item</li>
                  <li>+₱40 per succeeding item</li>
                  <li>Flat rate may apply for bulk orders (5+ items)</li>
                </ul>
              </td>
              <td>3-4 business days</td>
            </tr>
            <tr>
              <td>Outside Metro Manila</td>
              <td>
                <ul>
                  <li>Starts at ₱180 for the first item</li>
                  <li>+₱40 per succeeding item</li>
                </ul>
              </td>
              <td>4-7 business days</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h5>International Shipping</h5>
        <p>We ship to selected countries through international courier partners.</p>
        <p>Estimated delivery times</p>
        <ul>
          <li>Asia-Pacific: 5 to 10 business days</li>
          <li>USA and Canada: 7 to 14 business days</li>
          <li>Europe and Middle East: 10 to 15 business days</li>
          <li>Other regions: varies by destination</li>
        </ul>
        <p>Shipping fees are calculated at checkout based on destination and package weight. Customs duties, taxes, and import fees are the responsibility of the customer.</p>
      </div>
      <div>
        <h5>Order Processing</h5>
        <ul>
          <li>Orders are processed within 1 to 2 business days after payment confirmation.</li>
          <li>Tracking details are sent via email once the order is shipped.</li>
          <li>Custom or personalized items may require additional processing time.</li>
          <li>You will receive a tracking number once your order has been dispatched. Use this to monitor your shipment in real time.</li>
        </ul>
      </div>
      <div>
        <h5>Delivery Guidelines</h5>
        <p>Ensure that your shipping details are accurate and complete</p>
        <ul>
          <li>Failed deliveries due to incorrect information may result in additional fees</li>
          <li>Re-delivery requests may extend delivery timelines</li>
        </ul>
      </div>
      <div>
        <h5>Delays</h5>
        <p>Delivery timelines may be affected by:</p>
        <ul>
          <li>High order volume during peak seasons</li>
          <li>Weather conditions or natural events</li>
          <li>Courier service disruptions</li>
        </ul>
        <p>We will notify you if there are significant delays affecting your order.</p>
      </div>
      <div>
        <h5>Contact</h5>
        <p>For shipping concerns or assistance, contact our support team through your official customer service channels.</p>
      </div>
    </section>
  )
}

export default Shipping