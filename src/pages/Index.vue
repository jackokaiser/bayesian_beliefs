web<template>
  <div class="column q-pa-sm">
    <h4>Your questions</h4>
    <div v-if="questions.length === 0">
      <div class="text-h5"> Start by adding a new question </div>
    </div>
    <div v-else class="row items-start q-gutter-md">
      <q-item
        clickable
        v-for='question in questions'
        :key='question.id'
        tag="span"
        :to="questionUrl(question)"
      >
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-h6">{{ question.name }}</div>
          </q-card-section>
          <q-card-section class="q-gutter-sm q-pt-none">
            <q-separator />
            <probability-bar
              color="primary"
              v-for='hyp in question.hypothesis'
              :key='hyp.id'
              :value="hyp.prob">
              {{ hyp.name }}
            </probability-bar>
            <div>Number of events: {{question.nEvidences}}</div>
          </q-card-section>
        </q-card>
      </q-item>
    </div>
    <div class="row">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" to="/add-question" />
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import ProbabilityBar from 'components/ProbabilityBar.vue'

export default {
  name: 'PageIndex',
  components: { ProbabilityBar },
  data: function () {
    /* questions: [
     *   { id: 0, name: 'am I allergic to cat?' },
     *   { id: 1, name: 'is the earth flat?' }
     * ] */
    var questions = LocalStorage.getItem('questions') || []
    questions.forEach(function (question) {
      /* supplement questions with hypothesis */
      const quest = LocalStorage.getItem('question/' + question.id)
      question.hypothesis = quest.hypothesis
      question.nEvidences = quest.evidences.length
    })

    return {
      questions
    }
  },
  methods: {
    questionUrl: function (question) { return '/question/' + question.id }
  }
}
</script>
