import React, { useState } from "react";

export default function AvailableRooms() {
  const [date, setDate] = useState("");
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    if (!date) return;
    try {
      const response = await fetch(`http://localhost:8080/api/inventory?date=${date}`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Check Available Rooms</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={fetchRooms}>Check Availability</button>

      {rooms.length > 0 && (
        <table border="1" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Type</th>
              <th>Hotel ID</th>
              <th>Available Count</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.roomId}</td>
                <td>{room.type}</td>
                <td>{room.hotelId}</td>
                <td>{room.availableCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}