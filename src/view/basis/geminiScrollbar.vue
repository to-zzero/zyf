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

let geminiScrollbar;

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
  mounted () {
    geminiScrollbar = new GeminiScrollbar({
      element: this.$refs.geminiScrollbar,
      createElements: false,
      onResize: () => {
        this.$emit('resize')
      },
      ...this.$props
    })
    if (this.autoCreate) {
      geminiScrollbar.create()
    }
    this.$emit('ready', geminiScrollbar)
  },
  updated () {
    geminiScrollbar && geminiScrollbar.update()
  },
  beforeDestroy () {
    if (geminiScrollbar) {
      geminiScrollbar.destroy()
    }
    geminiScrollbar = null
  }
}
</script>
