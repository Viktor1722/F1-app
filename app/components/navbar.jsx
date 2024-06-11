import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/f1_logo 1.svg";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [races, setRaces] = useState([]);
  const router = useRouter();

  // Function to fetch race data
  const fetchRaceData = async () => {
    const year = 2024;
    const raceData = [];

    for (let round = 1; round <= 24; round++) {
      const raceUrl = `https://ergast.com/api/f1/${year}/${round}/results.json`;

      try {
        const response = await fetch(raceUrl);

        if (!response.ok) {
          console.error(
            `API call failed for round ${round} with status: ${response.status}`
          );
          continue;
        }

        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        if (races.length > 0) {
          const race = races[0];
          raceData.push({
            round: race.round,
            raceName: race.raceName,
            date: race.date,
          });
        } else {
          console.log(`No data for round ${round}`);
        }
      } catch (error) {
        console.error(`Fetch error for round ${round}:`, error);
      }
    }

    setRaces(raceData);
  };

  useEffect(() => {
    fetchRaceData();
  }, []);

  const handleRaceChange = (raceRound) => {
    router.push(`/raceStats/${raceRound}`);
    setIsOpen(false);
  };

  return (
    <nav className="bg-f1Red text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link
            href="/"
            className="text-white hover:text-gray-300"
            legacyBehavior
          >
            <Image
              onClick={() => setIsOpen(false)}
              src={Logo}
              width={100}
              alt="F1 Logo"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
            &#9776;
          </button>
        </div>
        <div
          className={`absolute md:relative w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 ease-in-out px-10 ${
            isOpen ? "top-16" : "top-[-490px]"
          } md:top-0 right-0 md:flex`}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-8 text-center gap-6">
            <li>
              <b>
                <Link
                  href="/raceResults"
                  className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                  legacyBehavior
                >
                  <p onClick={() => setIsOpen(false)}>Race Results</p>
                </Link>
              </b>
            </li>
            <li>
              <b>
                <Link
                  href="/about"
                  className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                  legacyBehavior
                >
                  <p onClick={() => setIsOpen(false)}>Driver Standings</p>
                </Link>
              </b>
            </li>
            <li>
              <b>
                <Link
                  href="/contact"
                  className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                  legacyBehavior
                >
                  <p onClick={() => setIsOpen(false)}>Constructors Standings</p>
                </Link>
              </b>
            </li>
            <li>
              <Select onValueChange={handleRaceChange}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Races" />
                </SelectTrigger>
                <SelectContent>
                  {races.map((race) => (
                    <SelectItem key={race.round} value={race.round}>
                      {race.raceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
