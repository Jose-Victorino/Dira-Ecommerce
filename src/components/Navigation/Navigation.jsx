import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, NavLink, Link } from 'react-router'
import useToggle from '@/hooks/useToggle'
import useClickOutside from '@/hooks/useClickOutside'
import cn from 'classnames'

import Logo from '@/Components/Logo/Logo'
import Marquee from '@/components/Marquee/Marquee'

import s from './Navigation.module.scss'

const root = document.getElementById('root')

const userSVG = <svg viewBox="0 0 24 24" fill="none" className='svg-md' xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="9" r="3" strokeWidth="1.7"/><circle cx="12" cy="12" r="10" strokeWidth="1.7"/><path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" strokeWidth="1.7" strokeLinecap="round"/></svg>
const cartSVG = <svg viewBox="0 0 24 24" fill="none" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M16 8H17.1597C18.1999 8 19.0664 8.79732 19.1528 9.83391L19.8195 17.8339C19.9167 18.9999 18.9965 20 17.8264 20H6.1736C5.00352 20 4.08334 18.9999 4.18051 17.8339L4.84718 9.83391C4.93356 8.79732 5.80009 8 6.84027 8H8M16 8H8M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8L8 12" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
const barsSVG = <svg viewBox="0 0 24 24" fill="none" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M5 12H20" strokeWidth="2" strokeLinecap="round"/><path d="M5 17H20" strokeWidth="2" strokeLinecap="round"/><path d="M5 7H20" strokeWidth="2" strokeLinecap="round"/></svg>
const closeSVG = <svg viewBox="0 0 24 24" fill="none" className='svg-md' xmlns="http://www.w3.org/2000/svg"><path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
const facebookSVG = <svg xmlns="http://www.w3.org/2000/svg" className='svg-sm' viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
const githubSVG = <svg xmlns="http://www.w3.org/2000/svg" className='svg-sm' viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
const linkedinSVG = <svg xmlns="http://www.w3.org/2000/svg" className='svg-sm' viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>

const MAIN_NAV_LINKS = [
  { label: 'Shop', to: '/shop' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact us', to: '/contact-us' },
]
const PROFILE_NAV_LINKS = [
  { label: 'Profile', to: '/profile' },
  { label: 'Orders', to: '/orders' },
]

function MobileNavigation({currentLinks, closeMenu, menuValue}){
  const mobileNavRef = useRef(null)

  useClickOutside(mobileNavRef, closeMenu, menuValue)

  return createPortal(
    <div ref={mobileNavRef} className={cn(s.mobileNav, {[s.open]: menuValue})} role="dialog" inert={!menuValue}>
      <div className='flex j-end pad-15'>
        <button className='flex' onClick={closeMenu}>
          {closeSVG}
        </button>
      </div>
      <nav>
        <ul className={cn('flex-col', s.navLink)}>
          {currentLinks.map(({label, to}) =>
            <li key={to}>
              <NavLink
                to={to}
                className={({isActive}) => cn('w-100 pad-block-10 pad-inline-15', {[s.active]: isActive})}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className='flex-col gap-10 pad-inline-15 pad-block-15'>
        <div>
          <Link to='/auth/login' className='flex gap-10' onClick={() => scrollReset()}>
            {userSVG}
            <span>Login / Signup</span>
          </Link>
        </div>
        <hr />
        <ul className='flex-wrap j-center gap-15'>
          <li className='flex'>
            <Link to='https://www.facebook.com/JoseVictorinoo' className='flex' onClick={() => scrollReset()} target='_blank'>
              {facebookSVG}
            </Link>
          </li>
          <li className='flex'>
            <Link to='https://github.com/Jose-Victorino' className='flex' onClick={() => scrollReset()} target='_blank'>
              {githubSVG}
            </Link>
          </li>
          <li className='flex'>
            <Link to='https://www.linkedin.com/in/jose-victorino/' className='flex' onClick={() => scrollReset()} target='_blank'>
              {linkedinSVG}
            </Link>
          </li>
        </ul>
      </div>
    </div>
    ,document.body
  )
}

function Navigation() {
  const { pathname } = useLocation()
  const menu = useToggle()
  const currentLinks = ['profile', 'orders'].includes(pathname.split('/')[1])
    ? PROFILE_NAV_LINKS : MAIN_NAV_LINKS

  const openMenu = () => {
    root.inert = true
    menu.setTrue()
  }
  const closeMenu = () => {
    root.inert = false
    menu.setFalse()
  }

  return (
    <>
      <header className={cn('container-parent', s.header)}>
        <section className={s.top}>
          <div className='container flex a-center h-100'>
            <Marquee text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, sunt?'/>
          </div>
        </section>
        <section className={s.bottom}>
          <div className='container flex j-space-between a-center h-100'>
            <button
              className={s.openMenu}
              onClick={openMenu}
            >
              {barsSVG}
            </button>
            <div className={s.logoCont}>
              <Link to='/' className='flex'>
                <Logo />
              </Link>
            </div>
            <nav className={s.nav}>
              <ul className={cn('flex gap-20', s.navLink)}>
                {currentLinks.map(({label, to}) =>
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({isActive}) => cn({[s.active]: isActive})}
                    >
                      {label}
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
            <div className={cn('flex gap-15', s.actionButtons)}>
              <div className={s.userCont}>
                <Link to='/auth/login' className='flex'>
                  {userSVG}
                </Link>
              </div>
              <Link to='/cart' className='flex'>
                {cartSVG}
              </Link>
            </div>
          </div>
        </section>
      </header>
      <MobileNavigation
        currentLinks={currentLinks}
        useClickOutside={useClickOutside}
        closeMenu={closeMenu}
        menuValue={menu.value}
      />
    </>
  )
}

export default Navigation