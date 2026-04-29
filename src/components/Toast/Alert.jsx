import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import cn from 'classnames'

import useClickOutside from '@/hooks/useClickOutside'

import s from './Alert.module.scss'

let alertState = null
let listeners = new Set()

let alertRoot = null
let alertHost = null

function emit(){
  for(const listener of listeners) listener()
}
function subscribe(listener){
  listeners.add(listener)
  return () => listeners.delete(listener)
}
function getSnapshot(){
  return alertState
}
function ensureMounted(){
  if(alertRoot) return

  alertHost = document.createElement('div')
  alertHost.id = 'alert-root'
  document.body.appendChild(alertHost)

  alertRoot = createRoot(alertHost)
  alertRoot.render(<AlertView />)
}

export function alert(props){
  ensureMounted()

  return new Promise((resolve) => {
    alertState = {
      ...(typeof props === 'string' ? { message: props } : props),
      resolve
    }

    emit()
  })
}

function dismissAlert(result = true){
  if (!alertState) return

  alertState.resolve?.(result)
  alertState = null
  emit()
}

// TODO: continue
const ICONS = {
  check: <svg xmlns="http://www.w3.org/2000/svg" className={s.checkSVG} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>,
  exclamation: <svg xmlns="http://www.w3.org/2000/svg" className={s.exclamationSVG} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className={s.infoSVG} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>,
  question: <svg xmlns="http://www.w3.org/2000/svg" className={s.questionSVG} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" className={s.errorSVG} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>,
}

function AlertView(){
  const alert = useSyncExternalStore(subscribe, getSnapshot)
  const modalRef = useRef(null)

  const onClose = () => {
    dismissAlert({ isCancel: true, isConfirmed: false })
  }

  useClickOutside(modalRef, onClose, Boolean(alert))
  
  useEffect(() => {
    if(!alert) return
    
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const root = document.getElementById('root')

    body.style.overflow = 'hidden'
    root.inert = 'true'
    
    if(scrollbarWidth > 0){
      const computedPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`
    }
    
    return () => {
      root.inert = null
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [alert])

  if (!alert) return null

  const {
    icon,
    title,
    message,
    confirmBtnTxt = 'Confirm',
    cancelBtnTxt = 'Cancel',
    showConfirmBtn = true,
    showCancelBtn = false,
  } = alert

  const iconSVG = ICONS?.[icon?.toLowerCase()]

  const handleConfirm = () => {
    dismissAlert({ isCancel: false, isConfirmed: true })
  }
  const handleCancel = () => {
    dismissAlert({ isCancel: true, isConfirmed: false })
  }
  
  return (
    <div
      className={s.alertOverlay}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={s.alertContainer}
        role="document"
        tabIndex="-1"
        aria-modal='true'
      >
        {iconSVG &&
          <div className={cn('flex j-center', s.header)}>
            {iconSVG}
          </div>
        }
        <div className={cn('flex-col gap-5 a-center', s.body)}>
          <h5>{title}</h5>
          <p>{message}</p>
        </div>
        {(showConfirmBtn || showCancelBtn) &&
          <div className={cn('flex gap-10 j-center', s.footer)}>
            {showCancelBtn &&
              <button
                type='button'
                className={s.cancel}
                onClick={() => handleCancel()}
              >
                {cancelBtnTxt}
              </button>
            }
            {showConfirmBtn &&
              <button
                type='button'
                className={s.confirm}
                onClick={() => handleConfirm()}
              >
              {confirmBtnTxt}
            </button>
            }
          </div>
        }
      </div>
    </div>
  )
}