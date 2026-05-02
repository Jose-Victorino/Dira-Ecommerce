import { useState } from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Faq.module.scss'

const arrow = <svg viewBox="0 0 512 512" className='svg-md' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/></svg>

const PAGE_NAME = 'FAQ'

const FAQs = {
  'Product Information': [
    {
      id: 1,
      question: 'Are your shoes authentic?',
      answer: '<p>Yes. All products are sourced and sold as described on the product page.</p>',
    },
    {
      id: 2,
      question: 'How do I choose the right shoe size?',
      answer: '<p>Refer to the size guide available on each product page. If unsure, choose based on your usual brand size.</p>',
    },
    {
      id: 3,
      question: 'Do you sell shoe care products?',
      answer: '<p>Yes. We offer cleaning kits, protectors, and maintenance products for footwear.</p>',
    },
    {
      id: 4,
      question: 'Do you sell laces and accessories?',
      answer: '<p>Yes. We carry a variety of laces and accessories compatible with different shoe styles.</p>',
    },
    {
      id: 5,
      question: 'Are apparel items available?',
      answer: '<p>Yes. We offer a limited selection of apparel alongside footwear and accessories.</p>',
    },
    {
      id: 6,
      question: 'How do I care for my shoes?',
      answer: '<ul><li>Clean regularly using appropriate products</li><li>Store in a cool, dry place</li><li>Avoid prolonged exposure to water and sunlight.</li></ul>',
    },
  ],
  'Shipping': [
    {
      id: 7,
      question: 'How long does delivery take?',
      answer: '<ul><li>Metro Manila: 2 to 3 business days after dispatch</li><li>Provincial areas: 3 to 10 business days</li><li>International: 5 to 15 business days depending on location</li></ul>',
    },
    {
      id: 8,
      question: 'How much is the shipping fee?',
      answer: '<p>Shipping fees depend on your location, number of items, and selected delivery method. The total is shown at checkout.</p>',
    },
    {
      id: 9,
      question: 'Do you ship internationally?',
      answer: '<p>Yes. We ship to selected countries. Delivery time and cost depend on destination.</p>',
    },
    {
      id: 10,
      question: 'Will I pay customs fees for international orders?',
      answer: '<p>Yes. Customs duties and taxes are charged by your country and are your responsibility.</p>',
    },
    {
      id: 11,
      question: 'How can I track my order?',
      answer: '<p>You will receive a tracking number via email once your order has been shipped.</p>',
    },
  ],
  'Ordering and Payment': [
    {
      id: 12,
      question: 'How do I place an order?',
      answer: '<ul><li>Browse products</li><li>Add items to cart</li><li>Enter shipping details</li><li>Select payment method</li><li>Confirm your order</li></ul>',
    },
    {
      id: 13,
      question: 'What payment methods do you accept?',
      answer: '<p>We accept GCash, PayMaya, PayPal, and PayMongo.</p>',
    },
    {
      id: 14,
      question: 'Can I cancel my order?',
      answer: '<p>Yes, but only before it has been shipped. Once shipped, you need to follow the return process.</p>',
    },
    {
      id: 15,
      question: 'What happens if my payment fails?',
      answer: '<p>Your order will not be processed. You can try again using the same or a different payment method.</p>',
    },
    {
      id: 16,
      question: 'Do I need an account to order?',
      answer: '<p>You can browse without an account, but creating one allows you to track orders and manage your details.</p>',
    },
  ],
  'Delivery': [
    {
      id: 17,
      question: 'What happens if I miss my delivery?',
      answer: '<p>The courier may attempt redelivery. Additional fees may apply depending on the situation.</p>',
    },
  ],
  'Returns and Refunds': [
    {
      id: 18,
      question: 'Can I return an item?',
      answer: '<p>Yes, if the item is defective, incorrect, or damaged upon arrival and meets return conditions.</p>',
    },
    {
      id: 19,
      question: 'How many days do I have to request a return?',
      answer: '<p>You have 7 days from delivery to request a return.</p>',
    },
    {
      id: 20,
      question: 'How do I request a refund?',
      answer: '<p>Email your order details and photos of the item. Wait for approval before sending it back.</p>',
    },
    {
      id: 21,
      question: 'How long does it take to receive a refund?',
      answer: '<p>Refunds are processed within 5 to 10 business days after approval.</p>',
    },
    {
      id: 22,
      question: 'Who pays for return shipping?',
      answer: '<p>You cover the cost unless the return is due to our error.</p>',
    },
  ],
  'Account and Support': [
    {
      id: 23,
      question: 'How do I contact support?',
      answer: '<p>Email josevictorino003@gmail.com for assistance.</p>',
    },
    {
      id: 24,
      question: 'Can I update my account details?',
      answer: '<p>Yes. Log in to your account and edit your profile information.</p>',
    },
    {
      id: 25,
      question: 'Is my personal information secure?',
      answer: '<p>We take reasonable measures to protect your data. Refer to our Privacy Policy for details.</p>',
    },
  ],
}

const Accordion = ({qna}) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(p => !p)
  
  return (
    <li className={cn(s.accordion, {[s.show]: open})}>
      <div
        className={s.header}
        role='button'
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => {
          if(e.key === 'Enter') toggle()
        }}
      >
        <strong>{qna.question}</strong>
        <div className='flex'>{arrow}</div>
      </div>
      <div
        className={s.content}
        aria-hidden={!open}
        dangerouslySetInnerHTML={{__html: qna.answer}}
      />
    </li>
  )
}

function Faq() {  
  useDocumentTitle(`${PAGE_NAME} | Dira`)
  
  return (
    <section className='pad-block-40'>
      <div className={cn('container', s.grid)}>
        {Object.entries(FAQs).map(([title, values]) =>
          <div key={title}>
            <h5>{title}</h5>
            <ul className='flex-col gap-10'>
              {values.map((qna) => <Accordion key={qna.id} qna={qna}/>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default Faq