"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchRaceDataById } from "../../api/fetchRaceById";
import Loading from "app/raceResults/loading";
import Navbar from "app/components/navbar";

const RaceStats = ({ params }) => {
  const { id } = params;
  const [raceData, setRaceData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getRaceData = async () => {
      const data = await fetchRaceDataById(id);
      setRaceData(data);
    };

    getRaceData();
  }, [id]);

  if (!raceData) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-coal bg-zinc-900">
      <nav className="w-full ">
        <Navbar />
        <div className="flex flex-col items-center mt-12">
          <b>
            <h1 className="text-white text-3xl">{raceData.raceName}</h1>
          </b>
        </div>
      </nav>
    </main>
  );
};

export default RaceStats;
