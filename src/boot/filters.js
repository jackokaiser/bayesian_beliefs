import Vue from 'vue'

export default ({ app }) => {
  Vue.filter('calendar', function (date) {
    const d = new Date(date)
    return d.toLocaleDateString() + ' at ' + d.toLocaleTimeString()
  })
}
