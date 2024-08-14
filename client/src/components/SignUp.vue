<template>
  <div class="container">
    <h1>Signup</h1>
    <form class="formconatiner">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Enter your name"
          required
        />
      </div>

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
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div class="form-group">
        <label for="profession">Profession:</label>
        <select class="select-group" v-model="profession" required>
          <option disabled value="">Select your profession</option>
          <option>Engineer</option>
          <option>Doctor</option>
          <option>Artist</option>
          <option>Other</option>
        </select>
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

      <button type="button" v-on:click="RegisterUser">Register</button>
    </form>
    <p>Already have account? <router-link to="/login">Login </router-link></p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="success">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      profession: "",
      password: "",
      error: "",
      message: "",
    };
  },

  methods: {
    async RegisterUser() {
      try {
        this.error = "";
        this.message = "";

        let result = await axios.post(
          "http://localhost:4000/api/v1/users/register",
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            profession: this.profession,
            password: this.password,
          }
        );
        // console.log("result>>>", result);
        if (result.status == 201) {
          this.message = result.data.message;
          this.$router.push("/login");
        }
      } catch (error) {
        this.error = error.message;
        // console.log("error>>", error);
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

.select-group {
  width: 93%;
  padding: 8px;
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
