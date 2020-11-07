<template>
  <div>
    <div class="row" v-if="editable">
      <span class="col-sm-2 col-xs-1">
        <slot></slot>
      </span>
      <span class="col">
        <q-slider
          :value="currentProb"
          @input="setProb"
          :min="0.001"
          :max=".999"
          :step="0.001"
          :color="color"
          label
          :label-value="percent(currentProb)"
          label-always
        />
      </span>
    </div>
    <div class="row justify-center align-center rounded-borders" :style="probStyle" v-else>
      <span class="col-10 overflow-hidden">
        <slot></slot>
      </span>
      <span class="col-1">
        {{ percent(currentProb) }}
      </span>
    </div>
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
      currentProb: this.value
    }
  },
  computed: {
    probStyle: function () {
      var before = this.percent(this.currentProb / 2.0)
      var after = this.percent(this.currentProb)
      var col = colors.getBrand(this.color)
      var lightCol = colors.lighten(col, 25)
      return {
        background: 'linear-gradient(90deg,' +
                    lightCol + ' 0%,' +
                    lightCol + ' ' + before +
                    ', white ' + after + ')'
      }
    }
  },
  methods: {
    percent: function (prob) {
      return (prob * 100).toFixed(1) + '%'
    },
    setProb: function (prob) {
      /* set the data in this component */
      this.currentProb = prob
      /* propagate to parent v-model */
      this.$emit('input', this.currentProb)
    }
  }
}
</script>
