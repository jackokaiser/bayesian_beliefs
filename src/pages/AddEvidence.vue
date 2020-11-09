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
        hint="example: I met an old friend like my horoscope suggested"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter an event']"
      />
      <h5> Event likelihood </h5>
      <!-- <p> What is the probability of this event happening, if the hypothesis were true? </p> -->
      <div class="row items-center">
        <p> How likely was this event, if the hypothesis were true? </p>
        <q-space/>
        <q-btn round color="primary" icon="help" @click="help = true" />
        <q-dialog v-model="help">
          <q-card>
            <q-card-section>
              <div class="text-h6">Help</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              For every hypothesis, evaluate the likelihood of the event, assuming this hypothesis is true.
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div class="text-subtitle1">Example</div>
            </q-card-section>
                <q-card-section class="q-pt-none">
              If astrology works (hypothesis "yes"), then I had 100% chance of meeting an old friend today, as my horoscope suggested. Hypothesis "yes": 100%.
            </q-card-section>
            <q-card-section class="q-pt-none">
              If astrology does not work (hypothesis "no"), meeting an old friend by chance would happen approximately one day every 100 days, so 1%. Hypothesis "no": 1%.
            </q-card-section>
            <q-card-section class="q-pt-none">
              Similarly, not meeting an old friend would also have been an event, unlikely if astrology works, and likely caused by chance.
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Got it" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <div class="column q-gutter-sm">
        <probability-bar v-for='hyp in question.hypothesis'
                         :key='hyp.id'
                         color='secondary'
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
      help: false,
      question: question,
      likelihood
    }
  },
  methods: {
    onSubmit: function (evt) {
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
      console.log('new probs sum to 1:', posteriors.reduce((a, b) => a + b))
      this.question.evidences.push({
        id: this.question.evidences.length,
        name: this.name,
        likelihood: this.likelihood,
        date: new Date()
      })
      LocalStorage.set('question/' + this.question.id, this.question)
      this.$router.replace({ name: 'question', params: { questionId: this.question.id } })
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

<style lang="scss">
.hint {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}
</style>
