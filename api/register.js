export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = JSON.parse(req.body);

    // Backend validation to enforce strict domain rule
    if (!email || !email.endsWith("@adventz.com")) {
      return res.status(400).json({ error: "Invalid email domain" });
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const result = await response.json();

    // Respond quietly. Frontend handles all messages.
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
