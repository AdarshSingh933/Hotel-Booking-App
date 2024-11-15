"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import HotelCart from "./HotelCart/HotelCart";
import PriceRangeFilter from "./Filter";

interface Hotel {
  id: number;
  name: string;
  [key: string]: any; // For additional unknown properties
}

export default function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([]); // Type for hotel data
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // To check if more hotels are available
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]); 

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      try {
        const response = await axios.get<Hotel[]>( // Type the response
          `http://localhost:5000/api/hotels?page=${page}`
        );
        const data = response.data;
        if (data.length === 0) {
          setHasMore(false); // No more data available
        } else {
          setHotels((prevHotels) => [...prevHotels, ...data]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handlePriceRangeChange = (min: number, max: number) => {
    const filtered = hotels.filter(
      (hotel) => hotel.price >= min && hotel.price <= max
    );
  };

  return (
    <div className="hotel-list-main-container">
      <div className="hotel-list-sidebar">
      <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange}/>
      </div>
      <div className="hotel-list-container">
        <div className="hotel-list-search-conainer">
          <div className="elixir-trip-hotel">ElixirTrip Hotel</div>
          <button>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="destination"
            ></input>{" "}
            <img style={{ width: "25px" }} src="/svg/search-icon.svg" />{" "}
          </button>
          <div className="dropdown">
            <span className="dropdown-label">Sort By</span>
            <span className="dropdown-select">
              Price Low to High
              <span className="dropdown-icon">
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0h8L4 6z"
                    fill="black"
                    fill-rule="evenodd"
                    opacity=".87"
                  ></path>
                </svg>
              </span>
              <ul className="dropdown-list">
                <li className="dropdown-item"><span>Price Low to High</span></li>
                <li className="dropdown-item"><span>Price High to Low</span></li>
              </ul>
            </span>
          </div>
        </div>
        {hotels.map((hotel, index) =>
          index >= 4 ? <HotelCart key={hotel.id} hotel={hotel} /> : ""
        )}
        {loading && <p>Loading hotels...</p>}
        {!hasMore && <p>No more hotels to display.</p>}
      </div>
    </div>
  );
}
