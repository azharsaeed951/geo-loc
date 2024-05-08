const express = require("express");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");

const app = express();

app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  const ipAddress = requestIp.getClientIp(req);
  const geoLoc = geoip.lookup(ipAddress);

  const resp = {
    ipAddress,
    geoLoc,
  };

  res.send(resp);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
