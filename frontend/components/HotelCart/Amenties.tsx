'use client'

import React from "react";

interface AmenitiesProps {
  amenitiesHtml: string;
}

const Amenities: React.FC<AmenitiesProps> = ({ amenitiesHtml }) => {
  // Parse the amenities from raw HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(amenitiesHtml, "text/html");
  const amenities: string[] = Array.from(
    doc.querySelectorAll("span.exr-text-1")
  ).map((span) => span.textContent || "");

  // Define the facilities to show
  // const facilitiesToShow = ["Parking facility", "Dining area", "Reception"];
  const maxVisible = 3; // Max number of items to show before "+ more"

  // Transform the amenities to match the desired facilities
  const mappedFacilities = amenities.map((amenity) => {
    if (amenity.toLowerCase().includes("parking")) return "Parking facility";
    if (amenity.toLowerCase().includes("restaurant")) return "Dining area";
    if (amenity.toLowerCase().includes("reception")) return "Reception";
    return amenity;
  });

  // Filter out duplicates and limit the number of facilities displayed
  const uniqueFacilities = Array.from(new Set(mappedFacilities));
  const visibleFacilities = uniqueFacilities.slice(0, maxVisible);
  const extraCount = uniqueFacilities.length - maxVisible;

  return (
    <div className="facility">
      {visibleFacilities.map((facility, index) => (
        <div key={index} className="facility-item">
          <i className="exr-icon-1">✔</i> <span>{facility}</span>
        </div>
      ))}
      {extraCount > 0 && (
        <div className="facility-item">
          <i className="exr-icon-1">✔</i> <span>+ {extraCount} more</span>
        </div>
      )}
    </div>
  );
};

export default Amenities;
