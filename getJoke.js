import fetch from 'node-fetch';

export default async function getJoke (url) {
  const joke = await fetch(url);
  const jokeJson = await joke.json();
  const jokeResponse = jokeJson.joke;
  return jokeResponse;
};
