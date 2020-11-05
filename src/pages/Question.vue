<template>
  <div class="q-pa-sm">
    <h4> {{ question.name }} </h4>
    <h5> Your current beliefs: </h5>
    <div class="column q-gutter-sm">
      <probability-bar
        v-for='hyp in question.hypothesis'
        :key='hyp.id'
        :value="hyp.prob">
        {{ hyp.name }}
      </probability-bar>
    </div>
    <div class="row">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent">
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="$router.push({name: 'add-evidence', params: {questionId: question.id}})">
                <q-item-section>Add event</q-item-section>
              </q-item>
              <q-item clickable @click="$router.push({name: 'add-hypothesis', params: {questionId: question.id}})">
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
  props: ['questionId']
}

</script>
