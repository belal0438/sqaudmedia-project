<template>
  <Header />

  <table border="0.5" class="tableContainer">
    <tr class="trhead">
      <td>Name</td>
      <td>Phone</td>
      <td>Proffesion</td>
      <td>Actions</td>
    </tr>

    <tr v-for="user in Users" :key="user._id">
      <td>{{ user.name }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.profession }}</td>
      <td class="btn">
        <button>
          <router-link :to="'/update/' + user._id" class="edditrouter"
            >Eddit</router-link
          >
        </button>
        <button class="Delbtn" v-on:click="deteletUser(user._id)">
          Delete
        </button>
      </td>
      <div v-if="loading" class="loading">Loading movies...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </tr>
  </table>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";

export default {
  name: "Registerdusers",

  components: {
    Header,
  },

  data() {
    return {
      Users: [],
      loading: true,
      error: "",
    };
  },

  methods: {
    async deteletUser(id) {
      try {
        let result = await axios.delete(
          `http://localhost:4000/api/v1/users/delete/${id}`
        );
        // console.log("deletresut>>", result);
        if (result.status == 201) {
          this.loadData();
        }
      } catch (error) {
        // console.log("error>>", error);
        this.error = "You can't delete your Data";
        this.$router.push("/registered-users");
      }
    },

    async loadData() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      }
      try {
        let result = await axios.get(
          "http://localhost:4000/api/v1/users/details"
        );
        this.Users = result.data.data;
        this.loading = false;
      } catch (error) {
        this.error = "Failed to load users";
        this.loading = false;
      }
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style>
.tableContainer {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  background-color: aliceblue;
  width: 60%;
}

.trhead td {
  font-weight: 600;
}

td {
  height: 3rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn button {
  width: 50px;
  padding-left: 3px;
  height: 25px;
  margin-left: 10px;
}

.Delbtn {
  background-color: rgb(248, 150, 150);
}

.edditrouter {
  text-decoration: none;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}

@media (max-width: 575.98px) {
  .tableContainer {
    width: 80%;
  }
}
</style>
