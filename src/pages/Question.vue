<template>
  <div>
    question id: {{ questionId }}
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'Question',
  data: function () {
    var question = LocalStorage.getItem('question/' + this.questionId)
    return {
      question
    }
  },
  props: ['questionId']
}

</script>
