<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Event"
        hint="example: I do not see a curvature"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter a question']"
      />
      <h3> What is the likelihood of this event, if the following hypothesis were true? </h3>
      <div class="column">
        <probability-bar v-for='hyp in question.hypothesis'
                         :key='hyp.id'
                         v-model='likelihood[hyp.id]'
                         editable>
          {{ hyp.name }}
        </probability-bar>
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
