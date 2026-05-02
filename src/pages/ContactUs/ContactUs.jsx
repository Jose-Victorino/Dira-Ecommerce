import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useFormik } from 'formik'
import cn from 'classnames'

import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'

import s from './ContactUs.module.scss'

const PAGE_NAME = 'Contact Us'

const phoneSVG = <svg viewBox="0 0 24 24" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M5.73268 2.043C6.95002 0.832583 8.95439 1.04804 9.9737 2.40962L11.2347 4.09402C12.0641 5.20191 11.9909 6.75032 11.0064 7.72923L10.7676 7.96665C10.7572 7.99694 10.7319 8.09215 10.76 8.2731C10.8232 8.6806 11.1635 9.545 12.592 10.9654C14.02 12.3853 14.8905 12.7253 15.3038 12.7887C15.4911 12.8174 15.5891 12.7906 15.6194 12.78L16.0274 12.3743C16.9026 11.5041 18.2475 11.3414 19.3311 11.9305L21.2416 12.9691C22.8775 13.8584 23.2909 16.0821 21.9505 17.4148L20.53 18.8273C20.0824 19.2723 19.4805 19.6434 18.7459 19.7119C16.9369 19.8806 12.7187 19.6654 8.28659 15.2584C4.14868 11.144 3.35462 7.556 3.25415 5.78817L4.00294 5.74562L3.25415 5.78817C3.20335 4.89426 3.62576 4.13796 4.16308 3.60369L5.73268 2.043ZM8.77291 3.30856C8.26628 2.63182 7.322 2.57801 6.79032 3.10668L5.22072 4.66737C4.8908 4.99542 4.73206 5.35695 4.75173 5.70307C4.83156 7.10766 5.47286 10.3453 9.34423 14.1947C13.4057 18.2331 17.1569 18.3536 18.6067 18.2184C18.9029 18.1908 19.1975 18.0369 19.4724 17.7636L20.8929 16.3511C21.4704 15.777 21.343 14.7315 20.5252 14.2869L18.6147 13.2484C18.0871 12.9616 17.469 13.0562 17.085 13.438L16.6296 13.8909L16.1008 13.359C16.6296 13.8909 16.6289 13.8916 16.6282 13.8923L16.6267 13.8937L16.6236 13.8967L16.6171 13.903L16.6025 13.9166C16.592 13.9262 16.5799 13.9367 16.5664 13.948C16.5392 13.9705 16.5058 13.9959 16.4659 14.0227C16.3858 14.0763 16.2801 14.1347 16.1472 14.1841C15.8764 14.285 15.5192 14.3392 15.0764 14.2713C14.2096 14.1384 13.0614 13.5474 11.5344 12.0291C10.0079 10.5113 9.41194 9.36834 9.2777 8.50306C9.20906 8.06061 9.26381 7.70331 9.36594 7.43225C9.41599 7.29941 9.47497 7.19378 9.5291 7.11389C9.5561 7.07405 9.58179 7.04074 9.60446 7.01368C9.6158 7.00015 9.6264 6.98817 9.63604 6.9777L9.64977 6.96312L9.65606 6.95666L9.65905 6.95363L9.66051 6.95217C9.66122 6.95146 9.66194 6.95075 10.1908 7.48258L9.66194 6.95075L9.94875 6.66556C10.3774 6.23939 10.4374 5.53194 10.0339 4.99297L8.77291 3.30856Z"/></svg>
const envelopeSVG = <svg viewBox="0 -5 32 32" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M29.000,22.000 L3.000,22.000 C1.346,22.000 -0.000,20.654 -0.000,19.000 L-0.000,3.000 C-0.000,1.346 1.346,-0.000 3.000,-0.000 L29.000,-0.000 C30.654,-0.000 32.000,1.346 32.000,3.000 L32.000,19.000 C32.000,20.654 30.654,22.000 29.000,22.000 ZM3.000,20.000 L29.000,20.000 C29.551,20.000 30.000,19.552 30.000,19.000 L30.000,3.317 L16.651,14.759 C16.463,14.920 16.232,15.000 16.000,15.000 C15.768,15.000 15.537,14.920 15.349,14.759 L2.000,3.317 L2.000,19.000 C2.000,19.552 2.449,20.000 3.000,20.000 ZM28.464,2.000 L3.536,2.000 L16.000,12.683 L28.464,2.000 Z"/></svg>

function ContactUs() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  const { values, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: (val) => {

    },
  })

  return (
    <section className='flex j-center'>
      <div className={cn('container flex-wrap a-center j-center gap-30 pad-block-100', s.container)}>
        <div className='flex-col gap-10'>
          <h4>Contact Us</h4>
          <ul className='flex-col gap-10'>
            <li className='flex gap-10'>
              {phoneSVG}
              <p>(+63) 9284650259</p>
            </li>
            <li className='flex gap-10'>
              {envelopeSVG}
              <p>josevictorino003@gmail.com</p>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={cn('flex-col gap-10', s.form)}>
          <h4>Get in Touch!</h4>
          <Input type='text' placeholder='Name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} required />
          <Input type='email' placeholder='Email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} required />
          <Input type='textarea' placeholder='Message' name='message' value={values.message} onChange={handleChange} onBlur={handleBlur} required />
          <Button
            text='Send'
            span
            disabled={isSubmitting}
          />
        </form>
      </div>
    </section>
  )
}

export default ContactUs