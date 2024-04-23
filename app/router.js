// app/router.ts

import { router } from "next/app";
import fetch from "node-fetch";

const baseUrl = process.env.API_BASE_URL;
const sessionKey = process.env.SESSION_KEY;
const meetingKey = process.env.MEETING_KEY;

router.get("/v1/drivers", async () => {
  try {
    const response = await fetch(
      "https://api.openf1.org/v1/drivers?driver_number=1&session_key=9158"
    );
    if (!response.ok) {
      console.log(`Requesting URL: ${response.url}`);

      throw new Error(`API call failed with status: ${response.status}`);
    }
    const drivers = await response.json();
    return { json: drivers };
  } catch (error) {
    console.log(`Requesting URL: ${response.url}`);

    console.error("Failed to fetch drivers:", error);
    return { status: 500, json: { error: "Failed to fetch drivers" } };
  }
});

router.get("/v1/positions", async () => {
  try {
    const response = await fetch(
      `${baseUrl}/position?meeting_key=${meetingKey}&driver_number=40&position<=3`
    );
    if (!response.ok) {
      // Log error or handle it appropriately
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const positions = await response.json();
    return { json: positions };
  } catch (error) {
    console.error("Failed to fetch positions:", error);
    return { status: 500, json: { error: "Failed to fetch positions" } };
  }
});

export default router;
