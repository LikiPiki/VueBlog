<template>
  <div class="container">
    <Navbar/>
    <Login/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Navbar,
    Login
  }
}
</script>
