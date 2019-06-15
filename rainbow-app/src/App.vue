<template>
  <div id="app">
    <resource></resource>
  </div>
</template>

<script>

import Resource from './components/Resource'

export default {
  name: 'app',
  data () {
    return {
      activeUser: null
    }
  },
  components: {
    Resource
  },
  methods: {
  }
}
</script>