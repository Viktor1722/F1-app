"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Image from "next/image";
import MiamiGP from "../public/MiamiGP.avif";
import Mercedes from "../public/mercedes.svg";

async function fetchLastRaceDetails(year) {
  try {
    const raceUrl = `https://ergast.com/api/f1/${year}/last/results.json`;
    const response = await fetch(raceUrl);

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    const race = data.MRData.RaceTable.Races[0];

    const results = race.Results.map((result) => ({
      driver: {
        driverId: result.Driver.driverId,
        givenName: result.Driver.givenName,
        familyName: result.Driver.familyName,
      },
      constructor: result.Constructor.name,
      position: result.position,
    }));

    return {
      raceName: race.raceName,
      date: race.date,
      results,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default function Home() {
  const [lastRace, setLastRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const year = new Date().getFullYear();
        const raceDetails = await fetchLastRaceDetails(year);
        setLastRace(raceDetails);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const newsArticles = [
    {
      id: 1,
      image: "path-to-first-news-article-image.jpg", // Replace with your image path
      title:
        "MERCEDES COULD NEVER 'ABANDON' CURRENT CAR FOR F1 2026 HEAD START",
      description:
        "Mercedes boss Toto Wolff says his team could never accept throwing the towel in on the current generation of cars to get a head start on Formula 1's 2026 rules.",
    },
    // Add more articles as needed
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-coal bg-black">
      <div className="w-full">
        <Navbar />
      </div>
      <section>
        <div className="flex flex-col gap-4">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg"
            >
              <Image src={Mercedes} />
              <div className="bg-gray-900 p-4">
                <h3 className="text-xl font-bold text-white">
                  {article.title}
                </h3>
                <p className="text-white text-opacity-80 mt-2 max-w-xs">
                  {article.description}
                </p>
              </div>
              <div className="bg-gray-900 p-3">
                <button className="bg-opacity-75 bg-black text-white text-sm py-2 px-4 rounded">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="drivers" className="flex w-full flex-col items-center">
        <span className="w-full p-1 bg-stone-900 text-white">
          Last Grand Prix Finishers
        </span>
        <div className="w-full flex overflow-x-auto bg-white scroll-smooth scrollbar-hide">
          <div className="flex justify-start items-center space-x-2">
            {lastRace.results.map((result, index) => (
              <div
                key={index}
                className="flex-none flex flex-wrap justify-center w-60 mx-2 my-3 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">{index + 1}</span>
                  <div>
                    <p className="text-xs font-semibold">
                      {result.driver.givenName} {result.driver.familyName}
                    </p>
                    <p className="text-sm">{result.constructor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
