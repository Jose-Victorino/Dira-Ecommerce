import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './ContactUs.module.scss'

const PAGE_NAME = 'Contact Us'

function ContactUs() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <>
      ContactUs
    </>
  )
}

export default ContactUs