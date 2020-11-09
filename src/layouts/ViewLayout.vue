<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="keyboard_backspace"
          aria-label="Back"
          @click="backArrow($router)"
        />

        <q-toolbar-title>
          Bayesian beliefs
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ViewLayout',
  props: {
    backArrow: {
      type: Function,
      default: function (router) { router.go(-1) }
    }
  }
}
</script>
