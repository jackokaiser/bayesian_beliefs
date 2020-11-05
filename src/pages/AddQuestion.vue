<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <h5> Add a question </h5>
      <q-input
        filled
        v-model="name"
        label="Question"
        hint="example: is the earth flat?"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter a question']"
      />

      <q-toggle v-model="yesno" label="Yes/No hypothesis" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  name: 'AddQuestion',
  data: function () {
    return {
      name: '',
      yesno: true
    }
  },
  methods: {
    onSubmit: function (evt) {
      var allQuestions = LocalStorage.getItem('questions') || []
      var currentId = 0
      if (allQuestions.length > 0) {
        currentId = Math.max(...allQuestions.map(q => q.id)) + 1
      }
      var question = {
        id: currentId,
        name: this.name
      }
      allQuestions.push(question)
      LocalStorage.set('questions', allQuestions)
      Object.assign(question, {
        hypothesis: this.yesno ? [{
          id: 0,
          name: 'yes',
          prob: 0.5
        }, {
          id: 1,
          name: 'no',
          prob: 0.5
        }
        ] : [],
        evidences: []
      })
      LocalStorage.set('question/' + question.id, question)
      this.$router.push('/')
    },
    onReset: function (evt) {
      this.name = ''
      this.yesno = true
    }
  }
}
</script>
