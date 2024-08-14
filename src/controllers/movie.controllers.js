import axios from "axios";

const movieList = async (req, res) => {
  try {
    const response = await axios.post("https://hoblist.com/api/movieList", {
      category: "movies",
      language: "kannada",
      genre: "all",
      sort: "voting",
    });
    // console.log("response", response);
    res.json(response.data);
  } catch (error) {
    // console.log("ERRoR>>>", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { movieList };
