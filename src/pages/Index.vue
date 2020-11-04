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
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data: function () {
    return {
      questions: [
        { id: 0, name: 'am I allergic to cat?' },
        { id: 1, name: 'is the earth flat?' }
      ]
    }
  },
  methods: {
    questionUrl: function (question) { return '/question/' + question.id }
  }
}
</script>
