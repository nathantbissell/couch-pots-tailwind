import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCardBasic from '../../partials/dashboard/DashboardCardBasic';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';

export default function Players() {
  const [data, setData] = useState({ players: [] });
  const localhost = 'http://localhost:5000';

  const joshAllen = {
    players: [
      {
        name: 'Josh Allen',
        position: 'QB',
        auctionPrice: 11,
        totalPoints: 418.0,
        average: 26.125,
        bio: "Allen is the perfect example of why rushing is so important when it comes to QB fantasy evaluations. The 2018 first-round pick finished as fantasy's No. 6 QB last season despite ranking 23rd in passing yards, 21st with only 20 passing TDs, third worst in completion percentage (59%) and 11th worst in YPA (6.7). Of course, Allen also produced a 109-510-9 rushing line and has now paced the position in rushing TDs in each of his two NFL seasons (17 total). Allen's passing troubles remain a red flag, but the addition of Stefon Diggs should help his cause. As long as he keeps running, Allen will be a back-end QB1 option.",
        otherLeagueDraftValue: 8.93,
      },
    ],
  };
  useEffect(() => {
    async function fetchAxios() {
      const result = await axios(`${localhost}/players`);
      setData(result.data);
    }
    fetchAxios();
    if (data.players.length === 0) {
      setData(joshAllen);
    }
  }, []);

  const getPlayersByFilter = (pos, points) => {
    let result = [];
    if (pos === '') {
      result = data.players.filter((player) => player.totalPoints > points);
    } else if (points === 0) {
      result = data.players.filter((player) => (player.position = pos));
    } else {
      result = data.players.filter(
        (player) => player.totalPoints > points && player.position === pos
      );
    }

    return result;
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {getPlayersByFilter('', 400).map((filteredPlayer) => (
        <DashboardCard04
          name={filteredPlayer.name}
          totalPoints={filteredPlayer.totalPoints}
          auctionPrice={filteredPlayer.auctionPrice}
          otherLeagueDraftValue={filteredPlayer.otherLeagueDraftValue}
        />
      ))}
    </div>
  );
}
