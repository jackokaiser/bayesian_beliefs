<template>
  <div class="bar" :style='style'>
    <slot></slot>
    {{ value }}
  </div>
</template>
<script>
export default {
  name: 'ProbabilityBar',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      style: { width: '' + this.value * 100 + '%' }
    }
  }
}
</script>

<style lang="scss">
 .bar {
   background-color: red;
 }
</style>
