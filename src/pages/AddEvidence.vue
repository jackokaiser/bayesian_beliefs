<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <h5> Add an event </h5>
      <q-input
        style="max-width: 400px"
        filled
        v-model="name"
        label="Event name"
        hint="example: I do not see a curvature"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter an event']"
      />
      <h5> Event likelihood </h5>
      <p> What if the probability of this event happening, if the hypothesis were true? </p>
      <div class="column q-gutter-sm">
        <probability-bar v-for='hyp in question.hypothesis'
                         :key='hyp.id'
                         v-model='likelihood[hyp.id].prob'
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
    var likelihood = question.hypothesis.reduce(function (ret, hyp) {
      ret[hyp.id] = { prob: 0.5 }
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
      /* todo: also add evidence to evidence list */

      /* update beliefs using the bayes formula */
      var marginalLikelihood = 0.0
      this.question.hypothesis.forEach((hyp) => {
        marginalLikelihood += hyp.prob * this.likelihood[hyp.id].prob
      })
      console.log('marginal:', marginalLikelihood)
      this.question.hypothesis.forEach((hyp) => {
        hyp.prob = hyp.prob * this.likelihood[hyp.id].prob / marginalLikelihood
      }, this)
      const posteriors = this.question.hypothesis.map((hyp) => hyp.prob)
      console.log('posteriors: ', posteriors)
      console.log('new probs should sum to 1:', posteriors.reduce((a, b) => a + b))
      this.question.evidences.push({
        name: this.name,
        likelihood: this.likelihood,
        date: new Date()
      })
      LocalStorage.set('question/' + this.question.id, this.question)
      this.$router.push({ name: 'question', params: { questionId: this.question.id } })
    },
    onReset: function (evt) {
      for (const [key, val] of Object.entries(this.likelihood)) {
        console.log('previous prob: ', val)
        this.likelihood[key].prob = 0.5
        this.name = ''
      }
    }
  }
}
</script>
