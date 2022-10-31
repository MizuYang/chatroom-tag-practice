<template>
  <div class="row" ref="emojiWrap">
    <Picker :data="emojiIndex" set="twitter" @select="showEmoji" />
  </div>
</template>

<script>
// Import data/twitter.json to reduce size, all.json contains data for
// all emoji sets.
import data from 'emoji-mart-vue-fast/data/all.json'
// Import default CSS
import 'emoji-mart-vue-fast/css/emoji-mart.css'

// Vue 2:
// import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
// Vue 3, import components from `/src`:
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'

// Create emoji data index.
// We can change it (for example, filter by category) before passing to the component.
const emojiIndex = new EmojiIndex(data)

export default {
  name: 'App',
  components: {
    Picker
  },

  props: ['status'],
  emits: ['stuAddEmoji', 'teaAddEmoji'],

  data () {
    return {
      emojiIndex: emojiIndex,
      emojisOutput: ''
    }
  },

  methods: {
    showEmoji (emoji) {
      const emojisOutput = this.emojisOutput + emoji.native

      //* 當前點擊的是哪個父元件(老師or學生)，將該表情回傳至該對象
      if (this.status === 'student') {
        this.$emit('stuAddEmoji', emojisOutput)
      } else {
        this.$emit('teaAddEmoji', emojisOutput)
      }
    }
  },

  mounted () {
    const emojiWrap = this.$refs.emojiWrap

    emojiWrap.addEventListener('click', (e) => {
    })
  }
}
</script>

<style lang="scss" scoped>
.row { display: flex; }
.row > * { margin: auto; }
</style>
