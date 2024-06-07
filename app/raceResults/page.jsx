"use client";
import React, { useEffect, useState } from "react";
import { fetchAllRaceResults } from "../api/seasonResults";
import Navbar from "../components/navbar";

const RaceResults = () => {
  const [raceResults, setRaceResults] = useState([]);

  useEffect(() => {
    const getRaceResults = async () => {
      try {
        const data = await fetchAllRaceResults(2024);
        console.log("Race Results Data:", data); // Log race results data
        setRaceResults(data);
      } catch (error) {
        console.error("Error fetching race results:", error);
      }
    };
    getRaceResults();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-coal bg-black">
      <nav className="w-full">
        <Navbar />
      </nav>
      <section className="flex flex-wrap gap-3 items-end">
        <div className="race-results flex gap-12">
          {raceResults.map((race, index) => (
            <div key={index} className="race">
              <h2 className="text-white">{race.raceName}</h2>
              <p className="text-white">{race.date}</p>
              <p className="text-white">{race.location}</p>
              <p className="text-white">Round: {race.round}</p>
              <div className="flex py-3">
                {race.topThree.map((result, idx) => (
                  <div key={idx} className="result">
                    <p className="text-white">
                      {result.position}. {result.driver.givenName}{" "}
                      {result.driver.familyName} ({result.constructor})
                    </p>
                    <p className="text-white">Time: {result.time}</p>
                    {result.driver.headshot_url && (
                      <img
                        src={result.driver.headshot_url}
                        alt={`${result.driver.givenName} ${result.driver.familyName}`}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RaceResults;
