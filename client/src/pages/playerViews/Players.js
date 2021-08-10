import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';

export default function Players() {
  const [data, setData] = useState({ players: [] });
  const [initial, setInitialState] = useState({ players: [] });
  const [pts, setPts] = useState(0);
  const [pos, setPos] = useState('');
  const localhost = 'http://localhost:5000';

  const basePlayers = {
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
      {
        name: 'Aaron Rodgers',
        position: 'QB',
        auctionPrice: 15,
        totalPoints: 394.0,
        average: 24.625,
        bio: "Once a perennial top-two fantasy QB, Rodgers has settled in as more of a mid-to-back-end QB1 in recent seasons. That included 2019, which saw him finish ninth in fantasy points even though he appeared in all 16 games and ranked eighth in pass attempts. Rodgers' efficiency has been a culprit, as he hasn't finished better than 16th in YPA since 2014 after previously dominating the category. He also hasn't cleared 26 pass TDs in a season since 2016 and is no longer much of a factor with his legs. Rodgers has Davante Adams, Aaron Jones and a solid line at his disposal, but the 36-year-old is no longer an elite fantasy weapon.",
        otherLeagueDraftValue: 5.36,
      },
      {
        name: 'Derrick Henry',
        position: 'RB',
        auctionPrice: 45,
        totalPoints: 388.0,
        average: 24.25,
        bio: "Henry returns as the feature back in Tennessee after pacing the NFL in carries (303), rushing yards (1,540) and rushing touchdowns (16) in 2019. Henry has been an absolute force as a rusher, ranking no lower than third in YAC each of the past three seasons. His heavy recent workload is a concern, but the good news is that he's 25 years old and had not cleared 215 carries in a season prior to 2019. Henry's minimal workload as a receiver (career-high 18 receptions last season) will continue to limit his fantasy output, so coupled with a probable dip in rushing production, he should be valued as a back-end RB1.",
        otherLeagueDraftValue: 57.32,
      },
      {
        name: 'Dalvin Cook',
        position: 'RB',
        auctionPrice: 48,
        totalPoints: 378.0,
        average: 27.0,
        bio: "Cook's career has thus far been marred by injuries, but we saw a glimpse of his ceiling during a breakout 2019 campaign. Through Week 14, Cook led the league in rushing touchdowns and trailed only Christian McCaffrey in fantasy points. Cook missed two games and chunks of others but still finished no lower than ninth among backs in carries, receptions, touches, scrimmage yards and touchdowns. Cook's 15 carries inside the 5 were third most in the league, and he scored at least one touchdown in 11 of 14 games. Cook has now missed 19 games because of injury in three seasons, but there's no doubt the 24-year-old is positioned well as run-heavy Minnesota's primary back. He's a strong RB1 despite the durability concerns.",
        otherLeagueDraftValue: 58.46,
      },
      {
        name: 'Calvin Ridley',
        position: 'WR',
        auctionPrice: 21,
        totalPoints: 309.0,
        average: 20.6,
        bio: "Ridley enters his third NFL season as Atlanta's No. 2 wide receiver behind Julio Jones. The 2018 first-round pick impressed during his first two campaigns, catching 69% of his passes and averaging a healthy 8.0 YPT. Ridley took a step forward last season and actually had one of the highest floors in fantasy, finishing 27th or better during nine of his 13 outings. He sat 14th at the position in fantasy points prior to Week 14's season-ending abdomen injury. Especially with Mohamed Sanu and Austin Hooper gone, Ridley's role as Matt Ryan's No. 2 target is safe. The 25-year-old is a fringe top-20 fantasy receiver.",
        otherLeagueDraftValue: 27.05,
      },
      {
        name: 'Justin Jefferson',
        position: 'WR',
        auctionPrice: 1,
        totalPoints: 299.0,
        average: 18.6875,
        bio: "Minnesota used the 22nd pick of April's draft to select Jefferson ' the de facto replacement for Stefon Diggs. Jefferson is 6-foot-1, 202 pounds with outstanding ball skills and contested-catch ability. The former LSU Tiger also has decent wheels (4.43 40), though he doesn't stand out in terms of perimeter separation or against press, which helps explain why he aligned in the slot 90% of the time in 2019. With only Adam Thielen ahead of him on the depth chart, Jefferson won't be short of playing time as a rookie, which isn't new for the player who paced the FBS with 111 receptions in 2019. Jefferson's 83% catch rate and 18 touchdowns were best in this year's rookie class. Jefferson's short-term upside will be limited by Minnesota's run-heavy offense, but he's still worth a late-round pick.",
        otherLeagueDraftValue: 3.3,
      },
      {
        name: 'Travis Kelce',
        position: 'TE',
        auctionPrice: 32,
        totalPoints: 325.0,
        average: 21.666666666666668,
        bio: "Kelce enters the 2020 season attempting to pace all tight ends in fantasy points for the fifth consecutive season. Is that good? It seems good. Kelce continued his dominance last season by finishing as a top-13 fantasy TE every week other than 17. Kelce has finished no lower than second at the position in routes, targets, receptions and yardage each of the past three seasons. His touchdowns fell from 10 in 2018 to five in 2019, but his 7.3 OTD (second-highest) and nine end zone targets (fourth) suggest he was actually unlucky in that area. Kelce has never finished a season outside the top 10 in YPT and remains one of Patrick Mahomes' top targets. The 30-year-old is worth a look in Round 2.",
        otherLeagueDraftValue: 41.94,
      },
      {
        name: 'Darren Waller',
        position: 'TE',
        auctionPrice: 4,
        totalPoints: 292.0,
        average: 18.25,
        bio: "Waller's breakout 2019 season marked one of the most improbable breakout campaigns you'll ever see. Waller was drafted in the sixth round of the 2015 draft as a 6-foot-6 wide receiver. He barely saw the field while dealing with addiction but got back on his feet as a tight end with the Raiders. An absolute force from the get-go, Waller finished no lower than fourth among tight ends in snaps, routes, targets, receptions, yardage or YPT. Waller was held to three touchdowns (3.9 OTD) but finished third in fantasy points. The 27-year-old is Derek Carr's top target and positioned well for another high-volume season. He's a top-five fantasy tight end.",
        otherLeagueDraftValue: 16.99,
      },
    ],
  };
  useEffect(() => {
    async function fetchAxios() {
      const result = await axios(`${localhost}/players`);
      setData(result.data);
      setInitialState(result.data);
    }
    fetchAxios();
    if (data.length === 0) {
      setData(basePlayers);
      setInitialState(basePlayers);
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (initial !== data) {
      setData(initial);
    }
    filterPlayersByForm(pos, pts);
    // setCopy((prevState) => [...prevState]);
  };

  const filterPlayersByForm = (pos, points) => {
    let filterArray = initial;

    if (pos === '') {
      pos = 'QB';
    }
    if (points === '') {
      points = 0;
    }

    let filterResult = filterArray.filter(
      (player) => player.position === pos && player.totalPoints >= points
    );
    setData(filterResult);
  };

  // const resetPlayerArray = (prevState) => {
  //   if (copy !== data && copy !== basePlayers) {
  //     setData(copy);
  //   }
  // };

  return (
    <div>
      <div className="grid grid-cols-12">
        <form onSubmit={handleSubmit}>
          <label>
            Points:
            <input
              className="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
              type="number"
              name="points"
              value={pts}
              onChange={(e) => setPts(e.target.value)}
            />
          </label>
          <label>
            Position:
            <select
              className="py-3 px-12 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
              type="text"
              name="position"
              value={pos}
              onChange={(e) => setPos(e.target.value)}
            >
              <option value="QB">QB</option>
              <option value="RB">RB</option>
              <option value="WR">WR</option>
              <option value="TE">TE</option>
            </select>
          </label>
          <button
            type="submit"
            className="py-2 px-4 my-5 bg-green-500 text-black font-semibold rounded-lg shadow-md active:bg-emerald-700 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {data.players.map((player) => (
          <DashboardCard04
            key={player._id}
            name={player.name}
            totalPoints={player.totalPoints}
            auctionPrice={player.auctionPrice}
            otherLeagueDraftValue={player.otherLeagueDraftValue}
          />
        ))}
      </div>
    </div>
  );
}
