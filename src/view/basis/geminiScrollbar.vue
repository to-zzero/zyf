<template>
  <ul
    ref="geminiScrollbar"
    :style="{
      width: `${width}px`,
      height
    }"
    class="ul-reset">
    <li class="gm-scrollbar -vertical">
      <div class="thumb"></div>
    </li>
    <li class="gm-scrollbar -horizontal">
      <div class="thumb"></div>
    </li>
    <li class="gm-scroll-view">
      <slot></slot>
    </li>
  </ul>
</template>

<script>
import GeminiScrollbar from 'gemini-scrollbar';
import 'gemini-scrollbar/gemini-scrollbar.css';

export default {
  name:'BasisScrollbar',
  props: {
    autoCreate: {
      type: Boolean,
      default: true
    },
    autoshow: {
      type: Boolean,
      default: false
    },
    forceGemini: {
      type: Boolean,
      default: false
    },
    minThumbSize: {
      type: Number,
      default: 20
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: String
    }
  },
  data () {
    return {
      geminiScrollbar: null
    }
  },
  mounted () {
    this.geminiScrollbar = new GeminiScrollbar({
      element: this.$refs.geminiScrollbar,
      createElements: false,
      autoshow: true,
      forceGemini: true,
      onResize: () => {
        this.$emit('resize')
      },
      ...this.$props
    })
    if (this.autoCreate) {
      this.geminiScrollbar.create()
    }
    this.$emit('ready', this.geminiScrollbar)
  },
  updated () {
    this.geminiScrollbar && this.geminiScrollbar.update()
  },
  beforeDestroy () {
    if (this.geminiScrollbar) {
      this.geminiScrollbar.destroy()
    }
    this.geminiScrollbar = null
  }
}
</script>

<style lang="scss" scoped>
  .gm-scroll-view {
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
