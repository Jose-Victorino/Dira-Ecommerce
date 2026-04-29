import { useEffect, useRef, useState } from 'react'
import s from './toolbar.module.scss'

export default function LinkInputPopover({ editorRef, linkUrl, setLinkUrl, onApply, onCancel, onRemove, isEditing }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const inputRef = useRef(null)

  useEffect(() => {
    const nativeSelection = window.getSelection()
    if(!nativeSelection || nativeSelection.rangeCount === 0) return

    const range = nativeSelection.getRangeAt(0)
    const selectionRect = range.getBoundingClientRect()
    const editorRect = editorRef.current?.getBoundingClientRect()
    if(!editorRect) return

    setPosition({
      top: Math.max(selectionRect.bottom - editorRect.top + 8, 0),
      left: Math.max(selectionRect.left - editorRect.left, 0),
    })

    inputRef.current?.focus()
  }, [editorRef])

  return (
    <div className={s.linkPopover} style={{ top: position.top, left: position.left }}>
      {isEditing && <span className={s.linkPopoverLabel}>Edit link</span>}
      <input
        ref={inputRef}
        type="url"
        value={linkUrl}
        placeholder="https://..."
        onChange={e => setLinkUrl(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') onApply()
          if (e.key === 'Escape') onCancel()
        }}
      />
      <button onClick={onApply}>Apply</button>
      {isEditing && (
        <button className={s.removeButton} onClick={onRemove}>Remove</button>
      )}
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}