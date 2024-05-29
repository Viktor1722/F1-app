"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Image from "next/image";
import MiamiGP from "../public/MiamiGP.avif";
import Mercedes from "../public/mercedes.svg";
import CanadaGP from "../public/CanadaGP.png";
import CanadaFlag from "../public/CanadaFlag.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { fetchNextRaceDetails } from "../app/api/fetchNextRaceDetails";
import { fetchLastRaceDetails } from "../app/api/fetchLastRaceDetails";

export default function Home() {
  const [lastRace, setLastRace] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const year = new Date().getFullYear();
        const [raceDetails, nextRaceDetails] = await Promise.all([
          fetchLastRaceDetails(year),
          fetchNextRaceDetails(year),
        ]);
        setLastRace(raceDetails);
        setNextRace(nextRaceDetails);
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
      <section className="flex flex-wrap gap-3">
        <div>
          <Card>
            <CardHeader className="text-3xl">
              <CardTitle>{lastRace.raceName} 2024</CardTitle>
              <CardDescription className="text-lg w-[500px]">
                Home glory for Leclerc as he controls Monaco Grand Prix to win
                for Ferrari from Piastri and Sainz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className=" w-[600px] overflow-x-auto scroll-smooth scrollbar-hide rounded-lg">
                <div className="flex flex-col justify-center items-start space-x-2">
                  {lastRace.results.slice(0, 3).map((result, index) => {
                    const driverClass =
                      index === 0
                        ? "first-driver"
                        : index === 1
                        ? "second-driver"
                        : "third-driver";

                    const nameClass =
                      index === 0
                        ? "driver-name-1"
                        : index === 1
                        ? "driver-name-2"
                        : "driver-name-3";

                    return (
                      <div
                        key={index}
                        className={`flex-none bg-slate-200 w-[300px] rounded-xl flex flex-wrap justify-center mx-2 my-3 mt-4 p-4 ${driverClass}`}
                      >
                        <div className="flex flex-row items-center space-x-3">
                          <span className="text-lg font-bold">{index + 1}</span>
                          <div>
                            <p className={`text-xs font-semibold ${nameClass}`}>
                              {result.driver.givenName}{" "}
                              {result.driver.familyName}
                            </p>
                          </div>
                        </div>
                        <p className={`text-xs font-semibold ${nameClass}`}>
                          {result.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="bg-red-500 text-white px-12 py-5"
              >
                Button
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mt-6 bg-black border-none">
            <CardHeader className="text-3xl">
              <div className="flex gap-4">
                <CardTitle className="text-white">Next Race </CardTitle>
                <Image
                  src={CanadaFlag}
                  alt="Track"
                  className="w-12 object-cover rounded-sm mr-11"
                />
              </div>
              <CardDescription className="text-lg w-[500px] text-slate-50">
                {nextRace
                  ? `${nextRace.raceName} - ${nextRace.locality}, ${nextRace.country}`
                  : "No upcoming race data available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={CanadaGP} alt="Flag" className="w-96 mt-4" />
              {nextRace && (
                <>
                  <p className="text-lg text-white bg-zinc-700 rounded-xl px-4">
                    Date: {nextRace.date}
                  </p>
                  <p className="text-lg text-white">Time: {nextRace.time}</p>
                  <p className="text-lg text-white">
                    Track: {nextRace.trackName}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        {/* <div className="flex flex-col gap-4">
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
        </div> */}
      </section>
    </main>
  );
}
