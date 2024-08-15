<template>
  <div class="container">
    <h1>Login</h1>
    <form class="formconatiner">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="button" v-on:click="login">Login</button>
    </form>
    <p>Create New Account? <router-link to="/sign-up">SignUp </router-link></p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="success">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      error: "",
      message: "",
    };
  },

  async created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/");
    }
  },

  methods: {
    async login() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/");
      }
      try {
        const result = await axios.post(
          "http://localhost:4000/api/v1/users/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        if (result.status == 200) {
          localStorage.setItem("token", result.data.data.accessToken);
          this.message = result.data.message;
          this.$router.push("/");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style>
.container {
  width: 60%;
  font-family: Times, "Times New Roman", Georgia, serif;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  background-color: aliceblue;
  border-radius: 8px;
  padding-bottom: 10px;
}

h1 {
  padding-top: 18px;
}

.formconatiner {
  width: 80%;
  margin: auto;
  display: grid;
  gap: 1rem;
}

.form-group {
  margin: auto;
  display: grid;
  width: 100%;
}

.form-group > label {
  margin-right: auto;
  padding: 2px;
}

.form-group > input {
  padding: 8px;
  width: 90%;
  border-color: aliceblue;
}

button {
  background-color: #7bdcb766;
  width: 94%;
  height: 36px;
  border-radius: 5px;
}

button:hover {
  background-color: #ddd;
  color: #222;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

@media (max-width: 575.98px) {
  .container {
    width: 80%;
  }
}
</style>
