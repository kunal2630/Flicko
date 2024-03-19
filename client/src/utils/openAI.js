import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_TOKEN,
  dangerouslyAllowBrowser: true,
});

export default openai;
