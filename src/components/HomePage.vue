<script>
export default {
  name: "HomePage",
  mounted() {
    this.showKIMIN();
  },
  methods: {
    showKIMIN() {
      console.log(
          "--------- Developed by KIMIN ---------\n" +
          "______________________________________\n\n" +
          "+-+ +-+ +-+ +--+    +--+ +-+ +--+  +-+\n" +
          "| |/ /  | | |   \\  /   | | | |   \\ | |\n" +
          "|   |   | | | |\\ \\/ /| | | | | |\\ \\| |\n" +
          "| |\\ \\  | | | | \\  / | | | | | | \\   |\n" +
          "+-+ +-+ +-+ +-+  ++  +-+ +-+ +-+  +--+\n" +
          "______________________________________\n\n" +
          "-|MAIL: mailto://kimin_huang@qq.com\n" +
          "-|GITHUB: https://github.com/kimin5314\n");
    }
  }
}
</script>

<template>
  <div>
    <h1>welcome</h1>
  </div>
  <p>
    <router-link to="/register">register</router-link>
  </p>
  <p>
    <router-link to="/login">login</router-link>
  </p>
</template>

<style scoped>

</style>