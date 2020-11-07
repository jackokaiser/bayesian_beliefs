<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <h5> Add an hypothesis </h5>
      <q-input
        style="max-width: 400px"
        filled
        v-model="hypothesis.name"
        label="Hypothesis name"
        hint="example: my sneezing is caused by pollen allergy"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter an event']"
      />
      <h5> Initial probability </h5>
      <p> What is the initial probability of this hypothesis? </p>
      <probability-bar color='secondary'
                       v-model='hypothesis.prob'
                       editable>
        {{ hypothesis.name }}
      </probability-bar>
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
  name: 'AddHypothesis',
  components: { ProbabilityBar },
  props: ['questionId'],
  data: function () {
    var question = LocalStorage.getItem('question/' + this.questionId)

    return {
      question: question,
      hypothesis: {
        prob: 0.20,
        name: '',
        id: question.hypothesis.length
      }
    }
  },
  methods: {
    onSubmit: function (evt) {
      this.question.hypothesis.forEach((hyp) => {
        hyp.prob = hyp.prob * (1 - this.hypothesis.prob)
      })
      this.question.hypothesis.push(this.hypothesis)
      LocalStorage.set('question/' + this.question.id, this.question)
      this.$router.replace({ name: 'question', params: { questionId: this.question.id } })
    },
    onReset: function (evt) {
      this.hypothesis.name = ''
      this.hypothesis.prob = 0.20
    }
  }
}
</script>
