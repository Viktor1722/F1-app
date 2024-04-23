"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Home() {
  const [drivers, setDrivers] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const driversResponse = await fetch("/v1/drivers");
        if (!driversResponse.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const driversData = await driversResponse.json();
        setDrivers(driversData);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900">
      <div>
        <section>
          <>
            <Navbar />
          </>
        </section>
        <section>
          {" "}
          <div className="bg-black px-96 py-44 rounded-xl">
            <h1 className="text-white">F1 Drivers</h1>
            {drivers.map((driver) => (
              <div key={driver.driver_number}>
                <h2 className="text-white">{driver.full_name}</h2>
                <img
                  src={driver.headshot_url}
                  alt={`Headshot of ${driver.full_name}`}
                />
                <p className="text-white">Team: {driver.team_name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
