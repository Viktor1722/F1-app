"use client";
import React, { useEffect, useState } from "react";
import { fetchAllRaceResults } from "./api/seasonResults"; // Adjust the path based on your project structure

const RaceResults = () => {
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    const getRaceResults = async () => {
      try {
        const data = await fetchAllRaceResults(2024); // Adjust the year as needed
        setRaceResults(data);
      } catch (error) {
        console.error("Error fetching race results:", error);
      }
    };
    getRaceResults();
  }, []);

  return (
    <div className="race-results">
      {raceResults.map((race, index) => (
        <div key={index} className="race">
          <h2>{race.raceName}</h2>
          <p>{race.date}</p>
          <p>{race.location}</p>
          <p>Round: {race.round}</p>
          <div className="top-three">
            {race.topThree.map((result, idx) => (
              <div key={idx} className="result">
                <p>
                  {result.position}. {result.driver.givenName}{" "}
                  {result.driver.familyName} ({result.constructor})
                </p>
                <p>Time: {result.time}</p>
                <img
                  src={result.driver.headshot_url}
                  alt={`${result.driver.givenName} ${result.driver.familyName}`}
                  className="w-12 h-12 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceResults;
