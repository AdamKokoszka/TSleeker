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
      new TextAlign(),
      new ListItem(),
      new BulletList(),
      new OrderedList(),
      new HorizontalRule(),
      new History(),
    ],
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
