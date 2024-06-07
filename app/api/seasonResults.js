import { fetchDriverImages } from "../api/drivers";

export async function fetchAllRaceResults(year) {
  try {
    const raceUrl = `https://ergast.com/api/f1/${year}/results.json`;
    const response = await fetch(raceUrl);

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Data:", data);
    const races = data.MRData.RaceTable.Races; // Fetch all races

    // Fetch driver images
    const driverImages = await fetchDriverImages();
    const driverImageMap = driverImages.reduce((acc, driver) => {
      acc[driver.driver_number] = driver.headshot_url;
      return acc;
    }, {});

    console.log("Driver Image Map:", driverImageMap);

    const raceDetails = races.map((race) => {
      console.log("Processing race:", race.raceName);

      const topThree = race.Results.slice(0, 3).map((result) => {
        console.log(
          "Driver Permanent Number:",
          result.Driver.permanentNumber,
          "Headshot URL:",
          driverImageMap[result.Driver.permanentNumber]
        );

        return {
          driver: {
            driverId: result.Driver.driverId,
            givenName: result.Driver.givenName,
            familyName: result.Driver.familyName,
            time: result.Time ? result.Time.time : "N/A",
            headshot_url:
              driverImageMap[result.Driver.permanentNumber] ||
              "https://example.com/default-image.png",
          },
          constructor: result.Constructor.name,
          position: result.position,
        };
      });

      return {
        raceName: race.raceName,
        date: race.date,
        location: race.Circuit.Location.locality,
        round: race.round,
        topThree,
      };
    });

    console.log("Race Details Processed:", raceDetails);

    return raceDetails;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
