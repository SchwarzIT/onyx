const config = {
  api: {
    url: "https://live.api.schwarz/sit/assortment-generative-ai/assortment-generative-ai-api/v1/api/external/generate",
  },
  myApi: {
    tokenUrl: "https://live.api.schwarz/oauth/accesstoken/v3",
    clientId: process.env.MY_API_CLIENT_ID ?? "",
    clientSecret: process.env.MY_API_CLIENT_SECRET ?? "",
  },
};

const translations = await translate();
console.log(translations);

//
// UTILITY FUNCTIONS
//
async function translate() {
  const accessToken = await getMyAPIAccessToken();

  const response = await fetch(config.api.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      templateId: 258,
      variables: [
        {
          variableName: "outputLanguages",
          // TODO: replace with actual supported languages
          value: "Spanish",
        },
      ],
      linksToAttachments: [],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to translate: ${await response.text()}`);
  }

  const data: Record<string, object> = await response.json();
  return data;
}

async function getMyAPIAccessToken() {
  const response = await fetch(config.myApi.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: config.myApi.clientId,
      client_secret: config.myApi.clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get MyAPI access token: ${await response.text()}`);
  }

  const data: { access_token: string } = await response.json();
  return data.access_token;
}

export {};
