<template>
  <Header />
  <div class="movie-list-container">
    <h2>Kannada Movies</h2>
    <div v-if="loading" class="loading">Loading movies...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="movies.length" class="movies">
      <div v-for="movie in movies" :key="movie._id" class="movie-card">
        <img :src="movie.poster" alt="Movie Poster" class="movie-poster" />
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p><strong>Genre:</strong> {{ movie.genre }}</p>
          <p><strong>Director:</strong> {{ movie.director.join(" ") }}</p>
          <p><strong>Starring:</strong> {{ movie.stars.join(" ") }}</p>
          <p><strong>Votes:</strong> {{ movie.voting }}</p>
          <p><strong>Language:</strong> {{ movie.language }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";

export default {
  name: "Movie",
  components: {
    Header,
  },

  data() {
    return {
      movies: [],
      loading: true,
      error: "",
    };
  },
  async created() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
    try {
      const response = await axios.get("http://localhost:4000/api/v1/movies");
      this.movies = response.data.result || [];
      this.loading = false;
    } catch (err) {
      this.error = "Failed to load movies";
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.movie-list-container {
  width: 90%;
  margin: 0 auto;
  padding: 50px 15px;
  color: rgb(236, 238, 240);
  font-family: Times, "Times New Roman", Georgia, serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
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

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.movie-info {
  margin-top: 10px;
}

.movie-info h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.movie-info p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
