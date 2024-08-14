<template>
  <Header />
  <div class="Headin">
    <h1>hello from Comapny info side</h1>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "Company",
  components: {
    Header,
  },
};
</script>

<style>
.Headin {
  width: 70%;
  height: 30vh;
  margin-left: auto;
  margin-right: auto;
  background-color: aliceblue;
  border-radius: 8px;
}
</style>
