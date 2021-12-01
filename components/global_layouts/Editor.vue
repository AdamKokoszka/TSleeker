<template>
  <el-tiptap
    v-model="content"
    :extensions="extensions"
    :content="content"
    class="el_tiptap"
    :readonly="edit ? false : true"
    :show-menubar="edit ? true : false"
    :char-counter-count="false"
    placeholder="Opis"
    @onUpdate="onEditorUpdate"
  />
</template>

<script>
import {
  // all extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Strike,
  Underline,
  Link,
  ListItem,
  BulletList, // use with ListItem
  OrderedList, // use with ListItem
  TextAlign,
  // Fullscreen,
  HorizontalRule,
  History,
  TextColor,
} from 'element-tiptap'

// import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css' // import base style
import 'codemirror/mode/xml/xml.js' // language
import 'codemirror/addon/selection/active-line.js' // require active-line.js
import 'codemirror/addon/edit/closetag.js' // autoCloseTags

export default {
  name: 'Editor',
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    extensions: [
      new Doc(),
      new Text(),
      new Paragraph(),
      new Heading({ level: [2, 3] }),
      new Bold(),
      new Underline(),
      new Strike(),
      new TextColor(),
      new Link(),
      // new Bold({ bubble: true }),
      // new Underline({ bubble: true }),
      // new Strike({ bubble: true }),
      // new TextColor({ bubble: true }),
      // new Link({ bubble: true }),
      new TextAlign(),
      new ListItem(),
      new BulletList(),
      new OrderedList(),
      new HorizontalRule(),
      // new Fullscreen(),
      new History(),
    ],

    // content: `<h2 style="text-align: center">Welcome To Element Tiptap Editor Demo</h2><p>🔥 <strong>Element Tiptap Editor </strong>🔥is a WYSIWYG rich-text editor using&nbsp; <a href="https://github.com/scrumpy/tiptap" rel="noopener noreferrer nofollow">tiptap</a>&nbsp;and <a href="https://github.com/ElemeFE/element" rel="noopener noreferrer nofollow">element-ui</a>&nbsp;for Vue.js <img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200" data-display="right"> that s easy to use, friendly to developers, fully extensible and clean in design.</p><p></p><p style="text-align: right">👉Click on the image to get started image features 👉</p><p></p><p>You can switch to <strong>Code View </strong>💻 mode and toggle <strong>Fullscreen</strong> 📺 in this demo.</p><p></p><p><strong>Got questions or need help or feature request?</strong></p><p>🚀 <strong>welcome to submit an <a href="https://github.com/Leecason/element-tiptap/issues" rel="noopener noreferrer nofollow">issue</a></strong> 😊</p><p>I m continuously working to add in new features.</p><p></p><blockquote><p>This demo is simple, switch tab for more features.</p><p>All demos source code: <a href="https://github.com/Leecason/element-tiptap/blob/master/examples/views/Index.vue" rel="noopener noreferrer nofollow">source code 🔗</a></p></blockquote>`,
    content: '',
  }),
  created() {
    if (this.description && this.description !== '') {
      this.content = this.description
    } else {
      this.content = ''
    }
  },
  methods: {
    onEditorUpdate() {
      this.$emit('clicked', this.content)
    },
  },
}
</script>
<style>
.el_tiptap {
  border-radius: 5px;
}
.el_tiptap:focus {
  background-color: red;
}
.el_tiptap ::-webkit-scrollbar {
  background: #fff;
}
@media screen and (max-width: 500px) {
  .editor_con .el-tiptap-editor__command-button {
    width: 32px;
  }
}
</style>
