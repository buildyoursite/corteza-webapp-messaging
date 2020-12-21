import Vue from 'vue'

import './config-check'
import './console-splash'

import './plugins'
import './mixins'
import './components'
import './gesture'

import i18n from './i18n'
import store from './store'
import router from './router'

export default (options = {}) => {
  options = {
    el: '#app',
    name: 'messaging',
    template: '<div id="messenger" class="crust"><router-view/><vue-progress-bar /></div>',

    router,
    store,
    i18n: i18n(),

    mounted () {
      this.$Progress.finish()
    },

    created () {
      if (this.$auth.is()) {
        // Setup the progress bar
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
          this.$Progress.start()
          next()
        })
        this.$router.afterEach((to, from) => {
          this.$Progress.finish()
        })
      }
    },

    // Any additional options we want to merge
    ...options,
  }

  return new Vue(options)
}
