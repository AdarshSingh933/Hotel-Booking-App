'use client';

import { useState } from 'react';

interface SearchFormProps {
    onSearch: (searchParams: { destination: string; occupancy: string }) => void;
}

export default function HotelSearchForm({ onSearch }: SearchFormProps) {
    const [destination, setDestination] = useState('');
    const [occupancy, setOccupancy] = useState('');

    const handleSearch = () => {
        onSearch({ destination, occupancy });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <input
                type="number"
                placeholder="Occupancy"
                value={occupancy}
                onChange={(e) => setOccupancy(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
