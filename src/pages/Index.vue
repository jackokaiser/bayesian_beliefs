<template>
  <div class="q-pa-md row items-start q-gutter-md">
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
    <router-link :to="'/add-question'" tag="span" round>
      <q-btn round color="primary" icon="add"/>
    </router-link>
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
