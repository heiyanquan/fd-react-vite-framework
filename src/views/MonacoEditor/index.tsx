import { FC, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const MonacoEditor: FC = () => {
  const [value, setValue] = useState(`<p>Quill Rich Text Editor</p>
<p>
    <br>
</p>
<p>Quill is a free,
    <a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
    <a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
    <a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
<p>
    <br>
</p>
<ul>
    <li>Fast and lightweight</li>
    <li>Semantic markup</li>
    <li>Standardized HTML between browsers</li>
    <li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>
<p>
    <span style="font-size: 18px;">Downloads</span>
</p>
<img src="https://www.hsmap.com/static/img/20231122.f294357.png" />
`)

  return <ReactQuill theme="snow" value={value} onChange={setValue} />
}

export default MonacoEditor
