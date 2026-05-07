import { Fragment } from 'react'
import { NavLink } from 'react-router'
import cn from 'classnames'

import s from './Breadcrumbs.module.scss'

const dividers = {
  chevron: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>,
  caret: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>,
  double: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>,
  slash: '/',
}

export default function Breadcrumbs({ crumbs, divider = 'slash' }){
  const dividerElement = dividers[divider]
  
  return (
    <nav className={s.breadcrumbs}>
      {crumbs.map((c, i) => (
        <Fragment key={c.path}>
          <NavLink
            to={c.path}
            end
            className={({ isActive }) => cn({ [s.active]: isActive })}
          >
            {c.label}
          </NavLink>
          {i < crumbs.length - 1 &&
            <div className={s.divider}>
              {dividerElement}
            </div>
          }
        </Fragment>
      ))}
    </nav>
  )
}