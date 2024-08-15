<template>
  <Header />
  <div class="container">
    <h1>Update</h1>
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
      <button type="button" v-on:click="updateResturent">Update</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";

export default {
  name: "Updateuser",
  components: {
    Header,
  },

  data() {
    return {
      name: "",
      profession: "",
      phone: "",
      error: "",
    };
  },

  async created() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
    try {
      const result = await axios.get(
        `http://localhost:4000/api/v1/users/${this.$route.params.id}`,
        {
          headers: { Authorization: token },
        }
      );
      if (result.status == 201) {
        this.name = result.data.data.name;
        this.profession =
          result.data.data.profession.charAt(0).toUpperCase() +
          result.data.data.profession.slice(1).toLowerCase();
        this.phone = result.data.data.phone;
      }
    } catch (error) {
      // console.error("Failed to fetch client data", error);
      this.error = error.message;
    }
  },

  methods: {
    async updateResturent() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      }
      try {
        let result = await axios.put(
          `http://localhost:4000/api/v1/users/user/${this.$route.params.id}`,
          {
            name: this.name,
            profession: this.profession,
            phone: this.phone,
          },
          {
            headers: { Authorization: token },
          }
        );
        if (result.status == 201) {
          this.$router.push("/registered-users");
        }
      } catch (error) {
        // console.log("errr>>", error);
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
  border-radius: 8px;
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
  width: 90%;
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
