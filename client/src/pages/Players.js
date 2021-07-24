import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCardBasic from "../partials/dashboard/DashboardCardBasic";
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

  const getPlayersByFilter= (pos, points) => {
    let result = data.players.filter((player) => (player.totalPoints > points) && (player.position === pos));
    return result;
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {getPlayersByFilter("QB", 300).map((filteredPlayer) => (
        <DashboardCard04
          name={filteredPlayer.name}
          totalPoints={filteredPlayer.totalPoints}
          auctionPrice={filteredPlayer.auctionPrice}
        />
      ))}
    </div>
  );
}
