<template>
  <div class="row justify-center align-center" :style="probStyle" @mousedown='onMouseDown' @touchstart='onMouseDown'>
    <span class="col-10 overflow-hidden">
      <slot></slot>
    </span>
    <span class="col-1">
      {{ currentProb | toPercent }}
    </span>
  </div>
</template>
<script>
import { colors } from 'quasar'

export default {
  name: 'ProbabilityBar',
  props: {
    value: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
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
    probStyle: function () {
      var before = this.currentProb * 100 - 5 + '%'
      var after = this.currentProb * 100 + '%'

      return {
        background: 'linear-gradient(90deg,' +
                    colors.getBrand(this.color) + ' 0%,' +
                    colors.getBrand(this.color) + ' ' + before +
                    ', white ' + after + ')'
      }
    }
  },
  filters: {
    toPercent: function (val) {
      return (val * 100).toFixed(1) + '%'
    }
  },
  methods: {
    onMouseDown: function (event) {
      if (!this.editable) return
      console.log('Mouse down!')
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.clientX = event.clientX
      document.onmousemove = this.onMouseMove
      document.onmouseup = this.onMouseUp
    },
    onMouseMove: function (event) {
      console.log('Mouse move!')

      const magicScale = 400
      var offset = (event.clientX - this.clientX) / magicScale
      this.clientX = event.clientX
      this.currentProb = Math.max(Math.min(this.currentProb + offset, 1), 0)
      this.$emit('input', this.currentProb)
    },
    onMouseUp: function (event) {
      if (!this.editable) return
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>
