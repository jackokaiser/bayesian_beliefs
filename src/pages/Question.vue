<template>
  <div>
    <h2> {{ question.name }} </h2>
    <div class="column">
      <probability-bar v-for='hyp in question.hypothesis'
                       :key='hyp.id'
                       :value="hyp.probability">
        {{ hyp.name }}
      </probability-bar>
    </div>
    <router-link :to="{name: 'add-hypothesis', params: {questionId: question.id}}" tag="span" round>
      <q-btn round color="primary" icon="add"/>
    </router-link>
    <router-link :to="{name: 'add-evidence', params: {questionId: question.id}}" tag="span" round>
      <q-btn round color="primary" icon="add"/>
    </router-link>
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
  props: ['questionId']
}

</script>
