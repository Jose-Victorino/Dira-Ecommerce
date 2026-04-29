import { useEffect, useRef } from 'react'
import { $getRoot, $getSelection } from 'lexical'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { LinkNode } from '@lexical/link'
import { ListNode, ListItemNode } from '@lexical/list'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
// import { TreeViewPlugin } from '@lexical/react/LexicalTreeViewPlugin'

import ToolbarPlugin from './ToolbarPlugin'
import s from './RichTextEditor.module.scss'

// ? dangerousSetInnerHTML={{ __html: value }}

const theme = {
}

function onError(error) {
  console.error(error)
}

export default function RichTextEditor({ placeholder = 'Enter text...' }) {
  const editorRef = useRef(null)

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, QuoteNode, LinkNode, ListNode, ListItemNode],
  }
  
  return (
    <div ref={editorRef} className={s.editorWrapper}>
      <LexicalComposer initialConfig={{
        namespace: 'MyEditor',
        theme: {
  // heading: {
  //   h1: 'heading-h1',
  //   h2: 'heading-h2',
  //   h3: 'heading-h3',
  //   h4: 'heading-h4',
  //   h5: 'heading-h5',
  //   h6: 'heading-h6',
  // },
  text: {
    // bold: 'text-bold',
    // italic: 'text-italic',
    // underline: 'text-underline',
    strikethrough: 'text-strikethrough',
    // subscript: 'text-subscript',
    // superscript: 'text-superscript',
  },
  link: 'text-link',
  list: {
    ul: 'list-unordered',
    ol: 'list-ordered',
  },
},
        onError,
        nodes: [HeadingNode, QuoteNode, LinkNode, ListNode, ListItemNode],
      }}>
        <ToolbarPlugin editorRef={editorRef}/>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={s.richTextEditor}
              aria-placeholder={placeholder}
              // placeholder
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <ListPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  )
}