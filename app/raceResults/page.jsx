"use client";
import React, { useEffect, useState } from "react";
import { fetchAllRaceResults } from "../api/seasonResults";
import Navbar from "../components/navbar";
import { Separator } from "@/components/ui/separator";
import Loading from "./loading";

const RaceResults = () => {
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRaceResults = async () => {
      try {
        const data = await fetchAllRaceResults(2024);
        console.log("Race Results Data:", data); // Log race results data
        setRaceResults(data);
      } catch (error) {
        console.error("Error fetching race results:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getRaceResults();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-coal bg-zinc-900">
      <nav className="w-full">
        <Navbar />
      </nav>
      {loading ? (
        <div className="flex flex-grow items-center justify-center w-full">
          <Loading />
        </div>
      ) : (
        <section className="flex flex-col gap-3 items-center">
          <div className="flex flex-col race-results gap-12">
            {raceResults.map((race, index) => (
              <div
                key={index}
                className="race flex flex-col items-center text-white py-4 px-6 rounded-lg"
              >
                <div className="flex justify-between w-full gap-3">
                  {race.topThree.map((result, idx) => (
                    <div
                      key={`P${idx}`}
                      className={`result flex flex-col items-center ${
                        result.position === "1"
                          ? "order-2 scale-115"
                          : result.position === "2"
                          ? "order-1"
                          : "order-3"
                      }`}
                    >
                      <img
                        src={result.driver.headshot_url}
                        alt={`${result.driver.givenName} ${result.driver.familyName}`}
                        className={`${
                          result.position === "1" ? "w-32 h-32" : "w-24 h-24"
                        } mb-2 object-contain`}
                      />
                      <div className="bg-stone-800 rounded-lg px-5 py-1 shadow-inner shadow-zinc-700">
                        <p className="text-center text-xl font-bold">
                          {result.position}. {result.driver.name_acronym}{" "}
                        </p>

                        <p className="text-center text-md mt-1">
                          {result.driver.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full text-center mt-4 p-3 rounded-lg">
                  <p className="text-md text-zinc-400">Round: {race.round}</p>
                  <h2 className="text-2xl font-bold">{race.raceName}</h2>
                  <p className="text-lg text-zinc-400">{race.date}</p>
                </div>
                <Separator className="bg-zinc-500" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default RaceResults;
