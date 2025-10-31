import axios from 'axios'

// Handle captcha verification
export const verifyCaptcha = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    );

    if (response.data.success && response.data.score >= 0.5) {
      res.json({ message: "Captcha passed" });
    } else {
      res.status(400).json({ message: "Captcha failed" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error verifying captcha", err });
  }
};
