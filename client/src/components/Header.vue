<template>
  <nav class="nave">
    <router-link to="/login">Login/SignUp </router-link>
    <router-link to="/">Movie </router-link>
    <router-link to="/company-info">Company-Info </router-link>
    <router-link to="/registered-users">RegisteredUsers </router-link>
    <a v-on:click="logout" href="#">Logout </a>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.nave {
  width: 100%;
  background-color: #202020;
  overflow: hidden;
  font-family: Times, "Times New Roman", Georgia, serif;
}

.nave a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 14px;
  text-decoration: none;
  font-size: 16px;
  margin-right: 4px;
}

.nave a:hover {
  background-color: #ddd;
  color: #070707;
}
</style>
