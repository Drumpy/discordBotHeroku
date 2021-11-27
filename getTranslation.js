import fetch from "node-fetch";

export default async function getTranslation(url, text) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "es",
      format: "text",
    }),
    headers: { "Content-Type": "application/json" },
  });

  const translatedJson = await res.json();
  const translatedText = translatedJson.translatedText;
  return translatedText;
}
