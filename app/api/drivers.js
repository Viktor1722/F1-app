// pages/api/sessions.js

export default async function handler(req, res) {
  const response = await fetch("https://api.openf1.org/v1/drivers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  res.status(200).json(data);
}
