import { ReclaimClient } from "@reclaimprotocol/zk-fetch";
import { verifyProof, transformForOnchain } from "@reclaimprotocol/js-sdk";

const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = process.env.OPENAI_API_KEY;
const reclaimPublicKey = process.env.RECLAIM_PUBLIC_KEY;
const reclaimPrivateKey = process.env.RECLAIM_PRIVATE_KEY;

if (!reclaimPrivateKey || !reclaimPublicKey || !apiKey) {
  throw new Error('Env variables not set')
}

const reclaimClient = new ReclaimClient(reclaimPublicKey, reclaimPrivateKey);

const getProof = async () => {
  const data = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "Hello!",
      },
    ],
  };

  const publicOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
    },
  };

  const privateOptions = {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
    responseMatches: [
      {
        type: "regex" as const,
        value:
          '"choices":\\s*\\[\\s*{\\s*"index":\\s*0,\\s*"message":\\s*{\\s*"role":\\s*"assistant",\\s*"content":\\s*"(?<content>.*?)"',
      },
    ],
  };

  try {
    const proof = await reclaimClient.zkFetch(apiUrl, publicOptions, privateOptions);
    const isValidProof = await verifyProof(proof);
    return { proof, isValidProof };
  } catch (error) {
    console.error("Error during zkFetch:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
  }
};

const main = async () => {
  const proof = await getProof();
  if (proof?.proof) {
    const transformedProof = transformForOnchain(proof.proof);
    console.log(transformedProof);
    const urlFromProof = JSON.parse(transformedProof.claimInfo.parameters).url;
    console.log(urlFromProof);
  } else {
    console.error("Failed to generate proof.");
  }
};

main();
