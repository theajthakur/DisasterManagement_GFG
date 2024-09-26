const axios = require("axios");
async function getOAuthToken() {
  const clientId =
    "96dHZVzsAuuaDAbnFGVMiv1YwZGjVcQdi_yMuB1SYXSk9SlDsRAHGp4BRTg8X29tJnBJE9V0KTqwNAEnvYDvtJrfwo6Ipd7J";
  const clientSecret =
    "lrFxI-iSEg8ZuFim8HlkzLbYguW05PtlyYuqfxty-2paznL-GnRmXj9669T4k8-24sfr8uPIQXwKNO-uJtj73NWowJ2oKHPDSSbcYKyziuM=";
  const tokenUrl = "https://outpost.mapmyindia.com/api/security/oauth/token";

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.access_token; // Return OAuth token
  } catch (error) {
    throw new Error("Failed to get OAuth token: " + error.message);
  }
}

// Function to get location details (including coordinates) using eLoc
async function getLocationDetails(eLoc, token) {
  const detailUrl = `https://atlas.mapmyindia.com/api/places/eloc?eloc=${eLoc}`;

  try {
    const response = await axios.get(detailUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Return location details including coordinates
  } catch (error) {
    throw new Error("Failed to get location details: ");
  }
}

module.exports = { getLocationDetails, getOAuthToken };
