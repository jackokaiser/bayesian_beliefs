<template>
  <div class="column q-pa-sm">
    <h4>Your questions</h4>
    <div class="row items-start q-gutter-md">
      <q-item
        clickable
        v-for='question in questions'
        :key='question.id'
        tag="span"
        :to="questionUrl(question)"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ question.name }}</div>
          </q-card-section>
        </q-card>
      </q-item>
      <div class="row">
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="accent" to="/add-question" />
        </q-page-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  name: 'PageIndex',
  data: function () {
    return {
      questions: LocalStorage.getItem('questions') || []
      /* questions: [
       *   { id: 0, name: 'am I allergic to cat?' },
       *   { id: 1, name: 'is the earth flat?' }
       * ] */
    }
  },
  methods: {
    questionUrl: function (question) { return '/question/' + question.id }
  }
}
</script>