<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Event"
        hint="example: I do not see a curvature"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter an event']"
      />
      <h3> What is the likelihood of this event, if the following hypothesis were true? </h3>
      <div class="column">
        <probability-bar v-for='hyp in question.hypothesis'
                         :key='hyp.id'
                         v-model='likelihood[hyp.id]'
                         editable>
          {{ hyp.name }}
        </probability-bar>
      </div>

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>

  </div>
</template>

<script>
import ProbabilityBar from 'components/ProbabilityBar.vue'
import { LocalStorage } from 'quasar'

export default {
  name: 'AddEvidence',
  components: { ProbabilityBar },
  props: ['questionId'],
  data: function () {
    var question = LocalStorage.getItem('question/' + this.questionId)
    const nHyp = question.hypothesis.length
    var likelihood = question.hypothesis.reduce(function (ret, hyp) {
      ret[hyp.id] = 1.0 / nHyp
      return ret
    }, {})

    return {
      name: '',
      question: question,
      likelihood
    }
  },
  methods: {
    onSubmit: function (evt) {
      /* update beliefs using the bayes formula */
      const marginalLikelihood = Object.values(this.likelihood).reduce((a, b) => a + b)
      this.question.hypothesis.forEach((hyp) => {
        hyp.probability = hyp.probability * this.likelihood[hyp.id] / marginalLikelihood
      }, this)

      debugger
      Object.values(this.question.hypothesis).reduce((a, b) => a +b) === 1.

      var allQuestions = LocalStorage.getItem('questions') || []
      var currentId = Math.max(...allQuestions.map(q => q.id)) + 1
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
          probability: 0.5
        }, {
          id: 1,
          name: 'no',
          probability: 0.5
        }
        ] : []
      })
      LocalStorage.set('question/' + question.id, question)
      this.$router.push({ name: 'question', params: { questionId: question.id } })
    },
    onReset: function (evt) {
      this.name = ''
      this.yesno = true
    }
  }
}
</script>
