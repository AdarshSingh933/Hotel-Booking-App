const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const allowedOrigins = [
  'https://hotel-booking-app-gm-git-f5ce5f-adarsh-singhs-projects-dbd442d8.vercel.app',
  'https://hotel-booking-app-gmtf-jbjgzztw4.vercel.app'
];
app.use(cors({ origin: allowedOrigins }));

const BASE_URL = "https://api.elixirtrips.com/wp-json/wp/v2/hotels";

// Function to fetch hotels data
async function fetchHotels(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}?per_page=10&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error.message);
    throw error;
  }
}

// Endpoint to get hotels data
app.get("/api/hotels", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  try {
    const hotels = await fetchHotels(page);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
