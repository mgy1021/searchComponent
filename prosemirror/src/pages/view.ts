import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { Decoration, DecorationSet, EditorView } from "prosemirror-view"

interface renderInfo{
    from:number,
    to:number,
    classNames:string[]
}

function getContentBlock(text:string,splitRegex:RegExp){
  let blocks:string[] = text.split(splitRegex);
  console.log(blocks,'blocks')
  blocks = blocks.filter((blocksItem)=>{
    return blocksItem !==''
  })

  let position:number = 0

  const renderInfo:renderInfo[] = blocks.map((block:string)=>{

    const hasKeyword:boolean = block.indexOf(":")>=0

    // todo：处理children
    // if (hasKeyword) {
    
    // }

    const renderInfoItem = {
      from:text.indexOf(block,position)+1,
      to:text.indexOf(block,position)+block.length+1,
      classNames:hasKeyword?['search-query-text-filter']:['search-query-text']
    }

    position = text.indexOf(block,position)+block.length

    return renderInfoItem
  })

  return renderInfo
}

export const setupEditor = (el: HTMLElement|null) => {
    if(!el) return 

    // 根据 schema 定义，创建 editorState 数据实例
  const editorState = EditorState.create({
    schema,
  })
  
  // 创建编辑器视图实例，并挂在到 el 上
  const editorView = new EditorView(el, {
    state: editorState,
    // editor View 中增加一个 decorations
  decorations(state:EditorState):DecorationSet {
    let decorations:Decoration[] = []
    const contentBlock:renderInfo[] = getContentBlock(state.doc.textContent,/\s+/,0)

    contentBlock.forEach((item)=>{
      const decoration = Decoration.inline(item.from,item.to,{
        class:item.classNames.join(' ')
      })
      decorations.push(decoration)
    })
  
    // 返回的 decoration 必须是个 DecorationSet
    return DecorationSet.create(state.doc, decorations);
  }
  })

  // @ts-ignore
  window.editorView = editorView
}