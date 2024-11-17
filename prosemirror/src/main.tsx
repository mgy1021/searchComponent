import './index.css'
import { setupEditor } from './pages/view.ts'

document.getElementById('root')!.innerHTML = `
 <div>
  <h3> prosemirror 案例</h3>
  <div id="editorContainer"></div>
 </div>
`

// 调用 stetupEditor，将编辑器 view 挂在在 editorContainer 中
setupEditor(document.querySelector('#editorContainer'))