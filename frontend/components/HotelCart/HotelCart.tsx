import StarRating from "@/utils/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Amenities from "./Amenties";

const HotelCart = ({ hotel }: { hotel: any }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (hotel?.acf?.hotel_gallery?.length) {
        const galleryIds = hotel.acf.hotel_gallery.slice(0, 5); // Take the first 5 IDs
        const promises = galleryIds.map((id: number) =>
          axios
            .get(`https://api.elixirtrips.com/wp-json/wp/v2/media/${id}`)
            .then((response) => response.data.source_url)
        );

        try {
          const urls = await Promise.all(promises); // Wait for all requests to complete
          setImageUrls(urls);
        } catch (error) {
          console.error("Error fetching image URLs:", error);
        }
      }
    };

    fetchImages();
  }, [hotel]);

  return (
    <div className="hotel-cart-container">
      <div className="hotel-cart-border"></div>
      <div className="hotel-cart">
        <div className="img-container">
          {/* Display the first image */}
          {imageUrls[0] ? (
            <img src={imageUrls[0]} alt="Hotel" />
          ) : (
            <div>Loading Image...</div>
          )}
          <div className="photogallery">
            {/* Display the first five images */}
            {imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Gallery Image ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="hotel-cart-right-container">
          <div className="cart-heading">
            <div className="hotel-name">{hotel?.title?.rendered}</div>
            <div className="hotel-place">{hotel?.acf?.hotel_address}</div>
          </div>
          <div className="cart-right-mid-conatiner">
            <div className="rating">
              <StarRating rating={hotel?.acf?.hotel_rating} />
            </div>
            <div className="facility">
              {" "}
              <Amenities amenitiesHtml={hotel?.acf?.hotel_amenities} />
            </div>
            <div className="verification"></div>
          </div>
          <div className="cart-right-bottom-container">
            <div className="price-container">
              <div className="price">
              ₹ {hotel?.acf?.["rate-per-night"] ?? "N/A"}
              </div>
              <div className="price-detailing"></div>
            </div>
            <div className="hotel-cart-btn-container">
              <button className="view-details">View Details</button>
              <button className="book-now">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCart;
