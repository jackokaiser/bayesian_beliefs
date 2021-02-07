<template>
  <div class="q-pa-md">
    <h4> {{ question.name }} </h4>
    <h5> Current beliefs </h5>
    <div class="column q-gutter-sm">
      <probability-bar
        color="primary"
        v-for='hyp in question.hypothesis'
        :key='hyp.id'
        :value="hyp.prob">
        {{ hyp.name }}
      </probability-bar>
    </div>
    <h5 v-if="question.evidences.length === 0"> No past events </h5>
    <div v-else>
      <h5> Past events </h5>
      <div class="column">
        <q-card
          class="evidences"
          v-for='ev in question.evidences.slice().reverse()'
          :key='ev.id'>

          <q-card-section class="q-gutter-sm">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-subtitle6">{{ ev.name }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="clear" @click="deleteEvent(ev.id)" />
              </div>
            </div>
            <probability-bar
              color="secondary"
              v-for='(prob, hypId) in ev.likelihood'
              :key='hypId'
              :value="prob.prob">
              {{ question.hypothesis | getName(hypId) }}
            </probability-bar>
            <div class="text-grey">{{ ev.date | calendar }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable :disable="question.hypothesis.length === 0" :to="{name: 'add-evidence', params: {questionId: question.id}}">
                <q-item-section>Add event</q-item-section>
              </q-item>
              <q-item clickable :disable="isYesNo(question)" :to="{name: 'add-hypothesis', params: {questionId: question.id}}">
                <q-item-section>Add hypothesis</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import ProbabilityBar from 'components/ProbabilityBar.vue'
import { forwardBayesianStep, backwardBayesianStep } from '../lib/bayesian.js'

export default {
  name: 'Question',
  components: { ProbabilityBar },
  data: function () {
    var question = LocalStorage.getItem('question/' + this.questionId)
    return {
      question
    }
  },
  filters: {
    getName: function (hypothesis, hypId) {
      return hypothesis.find(hyp => (hyp.id === parseInt(hypId, 10))).name
    }
  },
  methods: {
    isYesNo: function (question) {
      const hyps = question.hypothesis
      return (hyps.length === 2) && (hyps[0].name === 'yes') && (hyps[1].name === 'no')
    },
    deleteEvent: function (id) {
      const removeIdx = this.question.evidences.findIndex((e) => e.id === id)
      /* revert all bayesian updates which followed the removed index (inclusive) */
      const evidencesToUnroll = this.question.evidences.slice(removeIdx).reverse()
      const originalHypothesis = evidencesToUnroll.reduce(backwardBayesianStep, this.question.hypothesis)
      console.log('original hypothesis before the removed evidence: ', originalHypothesis)

      /* re-apply the forward bayesian steps without the removed evidence */
      const evidencesToRoll = this.question.evidences.slice(removeIdx + 1)
      this.question.hypothesis = evidencesToRoll.reduce(forwardBayesianStep, originalHypothesis)

      /* finally remove the evidence from the list */
      this.question.evidences.splice(removeIdx, 1)
      LocalStorage.set('question/' + this.question.id, this.question)
    }
  },
  props: ['questionId']
}

</script>

<style lang="scss">
 .evidences {
   margin-bottom: 1em;
 }
</style>
