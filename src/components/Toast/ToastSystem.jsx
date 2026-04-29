import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import cn from 'classnames'

import s from './Toast.module.scss'

let toasts = []
let listeners = new Set()
let nextId = 1

const EXIT_MS = 200
const COLLAPSE_MS = 150
const DEFAULT_POSITION = 'top-right'
const DEFAULT_THEME = 'light'
const TOAST_POSITIONS = [
  'top-right',
  'top-center',
  'top-left',
  'bottom-right',
  'bottom-center',
  'bottom-left',
]

function emit() {
  for(const listener of listeners) listener()
}

function subscribe(listener){
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => toasts

function createToast(type, data = ''){
  const {
    duration = 3000,
    autoClose = true,
    ...rest
  } = typeof data === 'string' ? { message: data } : data

  const id = nextId++

  toasts = [...toasts, { ...rest, id, type, duration, autoClose, isExiting: false, isCollapsing: false }]
  emit()
  if(autoClose){
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }

  return id
}

export const toast = Object.assign(
  (data) => createToast('default', data),
  {
    success: (data) => createToast('success', data),
    error: (data) => createToast('error', data),
    warning: (data) => createToast('warning', data),
    info: (data) => createToast('info', data),
  },
)

function dismissToast(id) {
  const targetToast = toasts.find((t) => t.id === id)
  if(!targetToast || targetToast.isExiting) return

  toasts = toasts.map((t) => (
    t.id === id ? { ...t, isExiting: true } : t
  ))
  emit()

  setTimeout(() => {
    toasts = toasts.map((t) => (
      t.id === id ? { ...t, isCollapsing: true } : t
    ))
    emit()

    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      emit()
    }, COLLAPSE_MS)
  }, EXIT_MS)
}

const TOAST_VARIANTS = {
  default: { toastVariant: s.default, icon: null },
  success: { toastVariant: s.success, icon: 'check' },
  error:   { toastVariant: s.error, icon: 'alert' },
  warning: { toastVariant: s.warning, icon: 'warn' },
  info:    { toastVariant: s.info, icon: 'info' },
}
const POSITION_CLASS = {
  'top-right': s.posTopRight,
  // 'top-center': s.posTopCenter,
  'top-left': s.posTopLeft,
  'bottom-right': s.posBottomRight,
  // 'bottom-center': s.posBottomCenter,
  'bottom-left': s.posBottomLeft,
}

function ToastViewport(props){
  const { position = DEFAULT_POSITION, theme = DEFAULT_THEME, ...defaultSettings } = props
  const items = useSyncExternalStore(subscribe, getSnapshot)

  return createPortal(
    <div className={s.toastRoot}>
      <div className={cn(s.toastRegion, POSITION_CLASS[position], s[theme])}>
        {items.map((item, i) => {
          const { autoClose } = item
          const { toastVariant } = TOAST_VARIANTS[item.type] ?? TOAST_VARIANTS.default

          return (
            <div key={item.id} className={cn(s.toastSlot, {[s.slotUnmount]: item.isCollapsing})}>
              <div className={cn(s.toastItem, toastVariant, {[s.unmount]: item.isExiting})}>
                <p className={s.message}>{item.message}</p>
                {!autoClose &&
                  <button
                    className={s.closeBtn}
                    onClick={() => dismissToast(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
                  </button>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
    ,document.body
  )
}

export const ToastContainer = (props) => <ToastViewport {...props}/>