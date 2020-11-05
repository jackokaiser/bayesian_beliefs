<template>
  <div class="column q-pa-sm">
    <h5>Your questions</h5>
    <div class="row items-start q-gutter-md">
      <router-link
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
      </router-link>
      <div class="row">
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="accent" @click="$router.push('/add-question')" />
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
