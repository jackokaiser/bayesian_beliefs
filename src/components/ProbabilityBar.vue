<template>
  <div class="bar" :style='style' @mousedown='onMouseDown'>
    <slot></slot>
    {{ currentProb.toFixed(2) }}
  </div>
</template>
<script>
export default {
  name: 'ProbabilityBar',
  props: {
    value: {
      type: Number,
      required: true
    },
    editable: Boolean
  },
  data: function () {
    return {
      clientX: 0.0,
      dragInterval: null,
      currentProb: this.value
    }
  },
  computed: {
    style: function () {
      return { width: '' + this.currentProb * 100 + '%' }
    }
  },
  methods: {
    onMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.clientX = event.clientX
      document.onmousemove = this.onMouseMove
      document.onmouseup = this.onMouseUp
    },
    onMouseMove: function (event) {
      const magicScale = 400
      var offset = (event.clientX - this.clientX) / magicScale
      this.clientX = event.clientX
      this.currentProb = Math.max(Math.min(this.currentProb + offset, 1), 0)
      console.log('offset: ', offset, 'currentProb: ', this.currentProb)
      this.$emit('input', this.currentProb)
    },
    onMouseUp: function (event) {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style lang="scss">
 .bar {
   background-color: red;
 }
</style>
