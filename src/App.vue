<template>
  <div id="app">
    <router-view>
      <Home></Home>
    </router-view>
  </div>
</template>
<script>
import Home from "./components/Home";
export default {
  components: {Home}
}

</script>
