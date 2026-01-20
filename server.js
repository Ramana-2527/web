const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/feedback", (req, res) => {
  const { name, phone, email, message } = req.body;

  const text = `
-------------------------
Name   : ${name}
Phone  : ${phone}
Email  : ${email}
Message: ${message}
Date   : ${new Date().toLocaleString()}
-------------------------

`;

  fs.appendFileSync("feedback.txt", text);
  res.json({ status: "saved" });
});



app.get("/feedback", (req, res) => {
  const filePath = __dirname + "/feedback.txt";

  if (!fs.existsSync(filePath)) {
    return res.send("No feedback available yet.");
  }

  res.download(filePath, "feedback.txt");
});




app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
