import React from 'react'

import s from './common.module.scss'

function TermsOfService() {
  return (
    <section className={s.container}>
      <h3>Terms of Service</h3>
      <p>These Terms and Conditions govern your use of the Dira website and mobile application. By accessing or using our platform, you agree to be bound by these terms. If you do not agree, do not use our services.</p>
      <div>
        <h5>Use of the Platform</h5>
        <p>You must be at least 18 years old or have permission from a legal guardian to use this platform. You agree to use the platform only for lawful purposes.</p>
        <p>You must not:</p>
        <ul>
          <li>Use the platform for fraudulent or illegal activities</li>
          <li>Interfere with system security or operations</li>
          <li>Attempt to access accounts or data that are not yours</li>
        </ul>
      </div>
      <div>
        <h5>Account Registration</h5>
        <p>You may create an account to access certain features.</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Keep your login credentials secure</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that provide false information or violate these terms.</p>
      </div>
      <div>
        <h5>Orders and Acceptance</h5>
        <p>All orders placed through Dira are subject to acceptance and availability.</p>
        <p>We reserve the right to:</p>
        <ul>
          <li>Refuse or cancel any order at our discretion</li>
          <li>Limit quantities per order or customer</li>
          <li>Cancel orders in cases of pricing errors or suspected fraud</li>
        </ul>
        <p>If your order is canceled after payment, a full refund will be issued.</p>
      </div>
      <div>
        <h5>Pricing and Payments</h5>
        <p>All prices are listed in Philippine Peso unless stated otherwise.</p>
        <p>We accept payments through GCash, PayMaya, PayPal, and PayMongo.</p>
        <p>You agree to provide accurate payment details. We reserve the right to cancel transactions that fail payment verification.</p>
      </div>
      <div>
        <h5>Shipping and Delivery</h5>
        <p>Delivery timelines and fees are outlined in our Shipping Policy. Delays may occur due to factors outside our control, including courier issues and external events. We are not liable for delays once the order has been dispatched.</p>
      </div>
      <div>
        <h5>Returns and Refunds</h5>
        <p>Returns and refunds are governed by our Return and Refund Policy. Items must meet the stated conditions to be eligible for return or refund.</p>
      </div>
      <div>
        <h5>Intellectual Property</h5>
        <p>All content on the platform, including text, images, logos, and design, is owned by or licensed to Dira. You must not:</p>
        <ul>
          <li>Copy, reproduce, or distribute content without permission</li>
          <li>Use our branding for commercial purposes without consent</li>
        </ul>
      </div>
      <div>
        <h5>Limitation of Liability</h5>
        <p>Dira is provided on an “as is” and “as available” basis.</p>
        <p>We do not guarantee that:</p>
        <ul>
          <li>The platform will be uninterrupted or error-free</li>
          <li>Products will always meet your expectations</li>
        </ul>
        <p>To the fullest extent allowed by law, Dira is not liable for:</p>
        <ul>
          <li>Indirect or consequential damages</li>
          <li>Loss of data, revenue, or profits</li>
          <li>Issues arising from third-party services</li>
        </ul>
      </div>
      <div>
        <h5>User Content</h5>
        <p>If you submit reviews, comments, or other content, you grant Dira a non-exclusive, royalty-free license to use, reproduce, and display that content. You are responsible for ensuring that your content does not violate any laws or rights.</p>
      </div>
      <div>
        <h5>Privacy</h5>
        <p>Your use of the platform is also governed by our Privacy Policy.</p>
      </div>
      <div>
        <h5>Termination</h5>
        <p>We reserve the right to suspend or terminate access to the platform at any time if you violate these terms.</p>
      </div>
      <div>
        <h5>Governing Law</h5>
        <p>These Terms and Conditions are governed by the laws of the Republic of the Philippines. Any disputes shall be subject to the jurisdiction of courts in Quezon City, Metro Manila.</p>
      </div>
      <div>
        <h5>Changes to Terms</h5>
        <p>We may update these Terms and Conditions at any time. Continued use of the platform after changes means you accept the updated terms.</p>
      </div>
      <div>
        <h5>Contact</h5>
        <p>For questions regarding these Terms and Conditions, contact:</p>
        <p>Email: josevictorino003@gmail.com</p>
      </div>
    </section>
  )
}

export default TermsOfService