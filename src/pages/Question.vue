<template>
  <div class="q-pa-sm">
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
            <div class="text-subtitle6">{{ ev.name }}</div>
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