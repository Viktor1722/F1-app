"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Image from "next/image";
import CanadaFlag from "../public/CanadaFlag.png";
import Link from "next/link";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-coal bg-black">
      <div className="w-full">
        <Navbar />
      </div>
      <section className="flex flex-wrap gap-3 items-end">
        <div>
          <Card className="bg-black border-none">
            <CardHeader className="text-2xl text-white py-8">
              <CardTitle className="text-f1Red text-sm">
                Round 8 Last Race
              </CardTitle>
              <CardTitle className="py-2">{lastRace.raceName} 2024</CardTitle>
              <CardDescription className="text-base  text-slate-50">
                Home glory for Leclerc as he controls Monaco Grand Prix to win
                for Ferrari from Piastri and Sainz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide rounded-lg">
                <div className="flex flex-col justify-center items-start space-y-1 gap-2">
                  {lastRace.results.slice(0, 3).map((result, index) => {
                    const driverClass = `driver-${index + 1}`;

                    return (
                      <div
                        key={index}
                        className={`flex-none bg-white w-full rounded-lg flex justify-between items-center p-4 ${driverClass}`}
                      >
                        <div className="flex flex-row items-center space-x-2 gap-3">
                          <span className="text-lg font-bold">{index + 1}</span>
                          <div>
                            <p className="text-sm font-semibold">
                              {result.driver.givenName}{" "}
                              <span className="font-bold">
                                {result.driver.familyName}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-400">
                          {result.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-start space-x-2 mt-2">
              <Button
                variant="outline"
                className="bg-f1Red text-white px-6 py-2 border-none"
              >
                RESULTS
              </Button>
              <Button
                variant="outline"
                className="bg-black text-white border border-white px-6 py-2"
              >
                HIGHLIGHTS
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mt-4 bg-black border-none">
            <CardHeader className="text-2xl">
              <div className="flex gap-2">
                <CardTitle className="text-f1Red text-sm">
                  Round 9 Next Race
                </CardTitle>
              </div>
              <div className="flex gap-4 items-center mt-1">
                <p className="text-white">
                  {nextRace
                    ? `${nextRace.raceName}`
                    : "No upcoming race data available"}
                </p>

                <Image
                  src={CanadaFlag}
                  alt="Track"
                  className="w-12 object-cover rounded-sm"
                />
              </div>
              <p className="text-white">{nextRace.locality}</p>
              <p className="text-white text-lg mt-1">17-19 May</p>
              <CardDescription className="text-lg w-[500px] text-slate-50"></CardDescription>
            </CardHeader>
            <CardContent>
              {nextRace && (
                <div className="bg-slate-900 px-4 py-4 rounded-xl">
                  <div className="flex gap-4 items-center justify-between">
                    <p className="text-sm text-white">PRACTICE 1</p>
                    <p className="text-gray-400 text-sm">FRI</p>
                    <p className="text-white bg-zinc-800 px-2 py-1 rounded-2xl text-sm">
                      13:30 - 14:30
                    </p>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-2">
                    <p className="text-sm text-white">PRACTICE 2</p>
                    <p className="text-gray-400 text-sm">FRI</p>
                    <p className="text-white bg-zinc-800 px-2 py-1 rounded-2xl text-sm">
                      17:00 - 18:00
                    </p>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-2">
                    <p className="text-sm text-white">PRACTICE 3</p>
                    <p className="text-gray-400 text-sm">SAT</p>
                    <p className="text-white bg-zinc-800 px-2 py-1 rounded-2xl text-sm">
                      12:30 - 13:30
                    </p>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-2">
                    <p className="text-sm text-white">QUALIFYING</p>
                    <p className="text-gray-400 text-sm">SAT</p>
                    <p className="text-white bg-zinc-800 px-2 py-1 rounded-2xl text-sm">
                      16:00 - 17:00
                    </p>
                  </div>
                  <div className="flex gap-4 items-center justify-between mt-2">
                    <p className="text-sm text-white">RACE</p>
                    <p className="text-gray-400 text-sm">SUN</p>
                    <p className="text-white bg-zinc-800 px-2 py-1 rounded-2xl text-sm">
                      15:00
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-start space-x-2 mt-2">
              <Button
                disabled
                variant="outline"
                className="bg-f1Red text-white px-6 py-2 border-none"
              >
                LIVE
              </Button>
            </CardFooter>
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
