import Vue from 'vue'

Vue.filter('format', function(value, { format, dayjs }) {
  return (format && dayjs && dayjs(value).format(format)) || value
})
