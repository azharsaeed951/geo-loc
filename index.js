const express = require("express");
const https = require("https");
const requestIp = require("request-ip");
const geoip = require("geoip-lite");

const app = express();

app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  const ipAddress = requestIp.getClientIp(req);
  const geoLoc = geoip.lookup(ipAddress);

  const options = {
    path: `/${ipAddress}/json/`,
    host: "ipapi.co",
    port: 443,
    headers: { "User-Agent": "nodejs-ipapi-v1.02" },
  };

  https.get(options, function (resp) {
    let body = "";

    resp.on("data", function (data) {
      body += data;
    });

    resp.on("end", function () {
      let loc = JSON.parse(body);
      console.log(loc);
      res.send(loc);
    });
  });

  // const resp = {
  //   ipAddress,
  //   geoLoc,
  // };

  // res.send(resp);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
