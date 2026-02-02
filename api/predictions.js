export default async function handler(req, res) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  if (response.status !== 201) {
    let error = await response.text();
    res.status(500).json({ detail: error });
    return;
  }

  const prediction = await response.json();
  res.status(201).json(prediction);
}