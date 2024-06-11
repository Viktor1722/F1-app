export const fetchRaceDataById = async (id) => {
  const year = 2024;
  const raceUrl = `https://ergast.com/api/f1/${year}/${id}/results.json`;

  try {
    const response = await fetch(raceUrl);

    if (!response.ok) {
      console.error(
        `API call failed for round ${id} with status: ${response.status}`
      );
      return null;
    }

    const data = await response.json();
    const races = data.MRData.RaceTable.Races;

    if (races.length > 0) {
      return races[0];
    } else {
      console.log(`No data for round ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Fetch error for round ${id}:`, error);
    return null;
  }
};
