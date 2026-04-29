import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection, $createParagraphNode, UNDO_COMMAND, REDO_COMMAND, CAN_UNDO_COMMAND, CAN_REDO_COMMAND, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND, COMMAND_PRIORITY_CRITICAL, } from 'lexical'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode, $isHeadingNode, HeadingNode } from '@lexical/rich-text'
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isLinkNode } from '@lexical/link'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import cn from 'classnames'

import LinkInputPopover from './LinkInputPopover'
import ToolbarSelect from './ToolbarSelect'

import s from './toolbar.module.scss'

const ICON = {
  undo: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M3 9H16.5C18.9853 9 21 11.0147 21 13.5C21 15.9853 18.9853 18 16.5 18H12M3 9L7 5M3 9L7 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  redo: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M21 9H7.5C5.01472 9 3 11.0147 3 13.5C3 15.9853 5.01472 18 7.5 18H12M21 9L17 5M21 9L17 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  header: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M6 4V20M18 4V20M8 4H4M18 12L6 12M8 20H4M20 20H16M20 4H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bold: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M6 12H14C16.2091 12 18 10.2091 18 8C18 5.79086 16.2091 4 14 4H6V12ZM6 12H15C17.2091 12 19 13.7909 19 16C19 18.2091 17.2091 20 15 20H6V12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  italic: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M19 4H10M14 20H5M15 4L9 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  underline: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 21H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M7.5 7H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H9C11.7614 17 14 14.7614 14 12M16.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H15C12.2386 7 10 9.23858 10 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  strikethrough: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M6 16C6 18.2091 7.79086 20 10 20H14C16.2091 20 18 18.2091 18 16C18 13.7909 16.2091 12 14 12M18 8C18 5.79086 16.2091 4 14 4H10C7.79086 4 6 5.79086 6 8M3 12H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  subscript: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M128 128C110.3 128 96 142.3 96 160C96 177.7 110.3 192 128 192L143.3 192L232.9 320L143.3 448L128 448C110.3 448 96 462.3 96 480C96 497.7 110.3 512 128 512L160 512C170.4 512 180.2 506.9 186.2 498.4L272 375.8L357.8 498.4C363.8 507 373.6 512 384 512L416 512C433.7 512 448 497.7 448 480C448 462.3 433.7 448 416 448L400.7 448L311.1 320L400.7 192L416 192C433.7 192 448 177.7 448 160C448 142.3 433.7 128 416 128L384 128C373.6 128 363.8 133.1 357.8 141.6L272 264.2L186.2 141.6C180.2 133.1 170.4 128 160 128L128 128zM576 384C576 372.9 570.3 362.6 560.8 356.8C551.3 351 539.6 350.4 529.7 355.4L497.7 371.4C481.9 379.3 475.5 398.5 483.4 414.3C489 425.5 500.3 432 512 432L512 512C494.3 512 480 526.3 480 544C480 561.7 494.3 576 512 576L576 576C593.7 576 608 561.7 608 544C608 526.3 593.7 512 576 512L576 384z"/></svg>,
  superscript: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M576 96C576 84.9 570.3 74.6 560.8 68.8C551.3 63 539.6 62.4 529.7 67.4L497.7 83.4C481.9 91.3 475.5 110.5 483.4 126.3C489 137.5 500.3 144 512 144L512 224C494.3 224 480 238.3 480 256C480 273.7 494.3 288 512 288L576 288C593.7 288 608 273.7 608 256C608 238.3 593.7 224 576 224L576 96zM128 128C110.3 128 96 142.3 96 160C96 177.7 110.3 192 128 192L143.3 192L232.9 320L143.3 448L128 448C110.3 448 96 462.3 96 480C96 497.7 110.3 512 128 512L160 512C170.4 512 180.2 506.9 186.2 498.4L272 375.8L357.8 498.4C363.8 507 373.6 512 384 512L416 512C433.7 512 448 497.7 448 480C448 462.3 433.7 448 416 448L400.7 448L311.1 320L400.7 192L416 192C433.7 192 448 177.7 448 160C448 142.3 433.7 128 416 128L384 128C373.6 128 363.8 133.1 357.8 141.6L272 264.2L186.2 141.6C180.2 133.1 170.4 128 160 128L128 128z"/></svg>,
  alignLeft: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M16 10H3M20 6H3M20 14H3M16 18H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alignCenter: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M18 10H6M21 6H3M21 14H3M18 18H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alignRight: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M21 10H8M21 6H4M21 14H4M21 18H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  alignJustify: <svg viewBox="0 0 24 24" fill="none" className={s.strokeSVG} xmlns="http://www.w3.org/2000/svg"><path d="M21 10H3M21 18H3M21 6H3M21 14H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  listBullet: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M112 208C138.5 208 160 186.5 160 160C160 133.5 138.5 112 112 112C85.5 112 64 133.5 64 160C64 186.5 85.5 208 112 208zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM112 528C138.5 528 160 506.5 160 480C160 453.5 138.5 432 112 432C85.5 432 64 453.5 64 480C64 506.5 85.5 528 112 528zM160 320C160 293.5 138.5 272 112 272C85.5 272 64 293.5 64 320C64 346.5 85.5 368 112 368C138.5 368 160 346.5 160 320z"/></svg>,
  listNumbered: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M64 136C64 122.8 74.7 112 88 112L136 112C149.3 112 160 122.7 160 136L160 240L184 240C197.3 240 208 250.7 208 264C208 277.3 197.3 288 184 288L88 288C74.7 288 64 277.3 64 264C64 250.7 74.7 240 88 240L112 240L112 160L88 160C74.7 160 64 149.3 64 136zM94.4 365.2C105.8 356.6 119.7 352 134 352L138.9 352C172.6 352 200 379.4 200 413.1C200 432.7 190.6 451 174.8 462.5L150.8 480L184 480C197.3 480 208 490.7 208 504C208 517.3 197.3 528 184 528L93.3 528C77.1 528 64 514.9 64 498.7C64 489.3 68.5 480.5 76.1 475L146.6 423.7C150 421.2 152 417.3 152 413.1C152 405.9 146.1 400 138.9 400L134 400C130.1 400 126.3 401.3 123.2 403.6L102.4 419.2C91.8 427.2 76.8 425 68.8 414.4C60.8 403.8 63 388.8 73.6 380.8L94.4 365.2zM288 128L544 128C561.7 128 576 142.3 576 160C576 177.7 561.7 192 544 192L288 192C270.3 192 256 177.7 256 160C256 142.3 270.3 128 288 128zM288 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L288 352C270.3 352 256 337.7 256 320C256 302.3 270.3 288 288 288zM288 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L288 512C270.3 512 256 497.7 256 480C256 462.3 270.3 448 288 448z"/></svg>,
  indentIncrease: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M96 128C96 110.3 110.3 96 128 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128zM288 256C288 238.3 302.3 224 320 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L320 288C302.3 288 288 273.7 288 256zM320 352L512 352C529.7 352 544 366.3 544 384C544 401.7 529.7 416 512 416L320 416C302.3 416 288 401.7 288 384C288 366.3 302.3 352 320 352zM96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512zM223.8 332.6L121.8 411.9C111.3 420.1 96 412.6 96 399.3L96 240.7C96 227.4 111.3 219.9 121.8 228.1L223.7 307.4C231.9 313.8 231.9 326.3 223.7 332.7z"/></svg>,
  indentDecrease: <svg viewBox="0 0 640 640" stroke="none" className={s.fillSVG} xmlns="http://www.w3.org/2000/svg"><path d="M96.4 128C96.4 110.3 110.7 96 128.4 96L512.4 96C530.1 96 544.4 110.3 544.4 128C544.4 145.7 530.1 160 512.4 160L128.4 160C110.8 160 96.4 145.7 96.4 128zM288.4 256C288.4 238.3 302.7 224 320.4 224L512.4 224C530.1 224 544.4 238.3 544.4 256C544.4 273.7 530.1 288 512.4 288L320.4 288C302.7 288 288.4 273.7 288.4 256zM320.4 352L512.4 352C530.1 352 544.4 366.3 544.4 384C544.4 401.7 530.1 416 512.4 416L320.4 416C302.7 416 288.4 401.7 288.4 384C288.4 366.3 302.7 352 320.4 352zM96.4 512C96.4 494.3 110.7 480 128.4 480L512.4 480C530.1 480 544.4 494.3 544.4 512C544.4 529.7 530.1 544 512.4 544L128.4 544C110.7 544 96.4 529.7 96.4 512zM96.7 332.6C88.5 326.2 88.5 313.7 96.7 307.3L198.6 228C209.1 219.8 224.4 227.3 224.4 240.6L224.4 399.2C224.4 412.5 209.1 420 198.6 411.8L96.7 332.6z"/></svg>,
}
const BLOCK_OPTIONS = [
  { value: 'Normal', label: 'Normal' },
  { value: 'H1', label: 'Heading 1' },
  { value: 'H2', label: 'Heading 2' },
  { value: 'H3', label: 'Heading 3' },
  { value: 'H4', label: 'Heading 4' },
  { value: 'H5', label: 'Heading 5' },
  { value: 'H6', label: 'Heading 6' },
]
const ALIGN_OPTIONS = [
  { value: 'left',    icon: ICON.alignLeft },
  { value: 'center',  icon: ICON.alignCenter },
  { value: 'right',   icon: ICON.alignRight },
  { value: 'justify', icon: ICON.alignJustify },
]

function ToolbarButton({ icon, command, active = false, disabled = false }) {
  return (
    <button className={cn(s.toolbarButton, { [s.active]: active })} onClick={command} disabled={disabled}>
      {icon}
    </button>
  )
}

export default function ToolbarPlugin({ editorRef }) {
  const [editor] = useLexicalComposerContext()
  const [blockType, setBlockType] = useState('Normal')
  const [activeAlign, setActiveAlign] = useState('left')
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
  })
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isLink, setIsLink] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const handleInsertLink = useCallback(() => {
    if(!showLinkInput){
      editor.getEditorState().read(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const node = selection.anchor.getNode()
          const linkNode = $findMatchingParent(node, $isLinkNode)
          if (linkNode) {
            setLinkUrl(linkNode.getURL())
          }
        }
      })
      setShowLinkInput(true)
      return
    }
    if(linkUrl.trim()){
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: linkUrl.trim(), target: '_blank' })
    }
    else{
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
    setShowLinkInput(false)
    setLinkUrl('')
  }, [editor, showLinkInput, linkUrl])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return

        const node = selection.anchor.getNode()
        const linkNode = $findMatchingParent(node, $isLinkNode)
        setIsLink(linkNode !== null)

        const anchorNode = selection.anchor.getNode()
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow()
        const formatType = element.getFormatType?.()

        if($isHeadingNode(element)) {
          setBlockType(element.getTag())
        }
        else{
          setBlockType('normal')
        }

        setActiveAlign(formatType || 'left')
        setActiveFormats({
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
          strikethrough: selection.hasFormat('strikethrough'),
          subscript: selection.hasFormat('subscript'),
          superscript: selection.hasFormat('superscript'),
        })
      })
    })
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(CAN_UNDO_COMMAND, (payload) => {
        setCanUndo(payload)
        return false
      }, COMMAND_PRIORITY_CRITICAL),
      editor.registerCommand(CAN_REDO_COMMAND, (payload) => {
        setCanRedo(payload)
        return false
      }, COMMAND_PRIORITY_CRITICAL),
    )
  }, [editor])

  const handleBlockChange = useCallback((value) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return

      if (value === 'normal') {
        $setBlocksType(selection, () => $createParagraphNode())
      } else {
        $setBlocksType(selection, () => $createHeadingNode(value))
      }
    })
  }, [editor])

  return (
    <>
      <div className={s.toolbar}>
        <div className={s.toolGroup}>
          <ToolbarButton icon={ICON.undo} command={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} disabled={!canUndo}/>
          <ToolbarButton icon={ICON.redo} command={() => editor.dispatchCommand(REDO_COMMAND, undefined)} disabled={!canRedo}/>
        </div>
        <div className={s.divider}/>
        <div className={s.toolGroup}>
          <ToolbarSelect value={blockType} onChange={handleBlockChange} options={BLOCK_OPTIONS} />
        </div>
        <div className={s.divider}/>
        <div className={s.toolGroup}>
          <ToolbarButton icon={ICON.bold}           command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}           active={activeFormats.bold} />
          <ToolbarButton icon={ICON.italic}         command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}         active={activeFormats.italic} />
          <ToolbarButton icon={ICON.underline}      command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}      active={activeFormats.underline} />
          <ToolbarButton icon={ICON.link}           command={handleInsertLink}                                                    active={isLink} />
          <ToolbarButton icon={ICON.strikethrough}  command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}  active={activeFormats.strikethrough} />
          <ToolbarButton icon={ICON.subscript}      command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')}      active={activeFormats.subscript} />
          <ToolbarButton icon={ICON.superscript}    command={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')}    active={activeFormats.superscript} />
        </div>
        <div className={s.divider}/>
        <div className={s.toolGroup}>
          <ToolbarSelect
            value={activeAlign}
            onChange={val => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, val)}
            options={ALIGN_OPTIONS}
          />
          <ToolbarButton icon={ICON.listBullet}   command={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} />
          <ToolbarButton icon={ICON.listNumbered} command={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} />
          <ToolbarButton icon={ICON.indentIncrease} command={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)} />
          <ToolbarButton icon={ICON.indentDecrease} command={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)} />
        </div>
      </div>
      {showLinkInput && (
        <LinkInputPopover
          editorRef={editorRef}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          onApply={handleInsertLink}
          onCancel={() => { setShowLinkInput(false); setLinkUrl('') }}
          isEditing={isLink}
          onRemove={() => {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
            setShowLinkInput(false)
            setLinkUrl('')
          }}
        />
      )}
    </>
  )
}