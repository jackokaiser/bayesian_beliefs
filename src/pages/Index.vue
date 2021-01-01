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
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ question.name }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="clear" @click.prevent="askConfirmDelete(question.id)" />
              </div>
            </div>
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

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">This will delete all events in this question. Are you sure?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="deleteQuestion" />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
      questions,
      confirmDelete: false,
      idToDelete: null
    }
  },
  methods: {
    questionUrl (question) {
      return '/question/' + question.id
    },
    askConfirmDelete (id) {
      this.idToDelete = id
      this.confirmDelete = true
    },
    deleteQuestion () {
      this.confirmDelete = false

      if (this.idToDelete === null) {
        console.log('Can\'t delete: idToDelete is null!')
        return
      }

      var that = this
      const removeIdx = this.questions.findIndex(function (q) {
        return q.id === that.idToDelete
      })

      this.questions.splice(removeIdx, 1)
      LocalStorage.set('questions', this.questions)
    }
  }
}
</script>
