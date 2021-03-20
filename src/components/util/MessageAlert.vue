<template>
  <Button type="primary" @click="info">Display info prompt</Button>
</template>
<script>
export default {
  name: "MessageAlert",
  methods: {
    info () {
      this.$Message.info('This is a info tip');
    }
  }
}
</script>
