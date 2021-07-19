import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";

export default function Players() {
  const [data, setData] = useState({ players: [] });
  const localhost = "http://localhost:5000";

  useEffect(() => {
    async function fetchAxios() {
      const result = await axios(`${localhost}/players`);
      setData(result.data);
    }
    fetchAxios();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {data.players.map((player) => (
        <DashboardCard04
          name={player.name}
          position={player.position}
          auctionPrice={player.auctionPrice}
          totalPoints={player.totalPoints}
        />
      ))}
    </div>
  );
}
