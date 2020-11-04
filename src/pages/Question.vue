<template>
  <div>
    {{ question.name }}
    <div class="row"
         v-for='hyp in question.hypothesis'
         :key='hyp.id'>
      <probability-bar :value="hyp.probability">
        {{ hyp.name }}
      </probability-bar>
    </div>
    <router-link :to="'/add-hypothesis'" tag="span" round>
      <q-btn round color="primary" icon="add"/>
    </router-link>
    <router-link :to="'/add-evidence'" tag="span" round>
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
