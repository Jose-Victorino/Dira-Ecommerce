import React from 'react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import cn from 'classnames'

import s from './Profile.module.scss'

const PAGE_NAME = 'Profile'

function Profile() {
  useDocumentTitle(`${PAGE_NAME} | Dira`)

  return (
    <div>Profile</div>
  )
}

export default Profile