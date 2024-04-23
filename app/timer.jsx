import { useState, useEffect } from "react";

const useNextGrandPrix = () => {
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    const fetchRaceData = async () => {
      const res = await fetch("https://api.formula1.com/v1/race_schedule");
      const data = await res.json();
      const upcomingRaces = data.races.filter(
        (race) => new Date(race.date) > new Date()
      );
      if (upcomingRaces.length > 0) {
        setNextRace(upcomingRaces[0]);
      }
    };

    fetchRaceData();
  }, []);

  return nextRace;
};
export default CountdownTimer;
