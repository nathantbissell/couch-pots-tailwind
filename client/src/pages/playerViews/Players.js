import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DashboardCard07 from '../../partials/dashboard/DashboardCard07';
import Transition from '../../utils/Transition.js';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
export default function Players() {
  const [data, setData] = useState({ players: [] });
  const [initial, setInitialState] = useState({ players: [] });
  const [pts, setPts] = useState(0);
  const [pos, setPos] = useState('');
  const [price, setPrice] = useState(0);
  const [ppd, setPpd] = useState(0);
  const localhost = 'http://localhost:5000';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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
      result.data.players.sort(compare);
      setData(result.data);
      setInitialState(result.data);
    }
    fetchAxios();
    if (data.players.length === 0) {
      basePlayers.players.sort(compare);
      setData(basePlayers);
      setInitialState(basePlayers);
    }
  }, []);

  function compare(a, b) {
    const first = a.totalPoints;
    const second = b.totalPoints;
  
    let comparison = 0;
    if (first > second) {
      comparison = -1;
    } else if (first < second) {
      comparison = 1;
    }
    return comparison;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (initial !== data) {
      setData(initial);
    }
    filterPlayersByForm(pos, pts, price, ppd);
  };

  const resetCards = (event) => {
    event.preventDefault();
    setData(initial);
    setPts(0);
    setPpd(0);
    setPrice(0);
    setPos('ALL');
  };

  const filterPlayersByForm = (pos, points, price, ppd) => {
    let filterArray = initial;

    if (pos === '') {
      pos = 'ALL';
    }
    if (points === '') {
      points = 0;
    }
    if (price === '') {
      price = 0;
    }
    if (ppd === '') {
      ppd = 0;
    }
    let filterResult = { players: [] };

    if (pos === 'ALL') {
      filterResult.players = filterArray.players.filter(
        (player) =>
          player.totalPoints >= points &&
          player.auctionPrice >= price &&
          player.totalPoints / player.auctionPrice >= ppd
      );
    } else {
      filterResult.players = filterArray.players.filter(
        (player) =>
          player.position === pos &&
          player.totalPoints >= points &&
          player.auctionPrice >= price &&
          player.totalPoints / player.auctionPrice >= ppd
      );
    }
    setData(filterResult);
  };

  const isLoading = data.players.length > 15;

  return (
    <div>
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-5">
        <div className="relative inline-flex">
          <button
            ref={trigger}
            className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600 width-10"
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <span className="sr-only">Filter</span>
            <wbr />
            Filters
            <svg className=" ml-4 w-4 h-4 fill-current" viewBox="0 0 16 16">
              <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
            </svg>
          </button>
          <Transition
            show={dropdownOpen}
            tag="div"
            className="origin-top-right z-10 absolute top-full left-0 right-auto md:left-auto md:right-0 min-w-56 bg-white border border-gray-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div ref={dropdown}>
              <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                Filters
              </div>

              <div>
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
                    Auction Price:
                    <input
                      className="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </label>
                  <label>
                    Pts Per Dollar:
                    <input
                      className="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="ppd"
                      value={ppd}
                      onChange={(e) => setPpd(e.target.value)}
                    />
                  </label>
                  <label>
                    Position:
                    <select
                      className="py-3 px-4 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none w-full"
                      type="text"
                      name="position"
                      value={pos}
                      onChange={(e) => setPos(e.target.value)}
                    >
                      <option value="ALL">All Players</option>
                      <option value="QB">QB</option>
                      <option value="RB">RB</option>
                      <option value="WR">WR</option>
                      <option value="TE">TE</option>
                    </select>
                  </label>
                  <div className="py-2 px-3 border-t border-gray-200 bg-gray-50 mt-5">
                    <ul className="flex items-center justify-between">
                      <li>
                        <button
                          type="submit"
                          className="btn-xs bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                          onClick={(e) => resetCards(e)}
                        >
                          Clear
                        </button>
                      </li>
                      <li>
                        <button
                          type="submit"
                          className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={() => setDropdownOpen(false)}
                          onBlur={() => setDropdownOpen(false)}
                        >
                          Apply
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {isLoading ? (
          <DashboardCard07 players={data.players} />
        ) : (
          data.players.map((player) => (
            <DashboardCard04
              key={player._id}
              name={player.name}
              totalPoints={player.totalPoints}
              auctionPrice={player.auctionPrice}
              otherLeagueDraftValue={player.otherLeagueDraftValue}
            />
          ))
        )}
      </div>
    </div>
  );
}
