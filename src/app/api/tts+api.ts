import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export function GET(request: Request) {
  return Response.json({ hello: "world" });
}

export async function POST(request: Request) {
  const { text } = await request.json();
  if (!text) {
    return Response.json(
      {
        error: "Text is required",
      },
      { status: 400 }
    );
  }

  const audio = await client.textToSpeech.convert("", {
    text,
    model_id: "eleven_multilingual_v2",
    output_format: "mp3_44100_128",
  });

  const chunks = [];
  for await (const chunk of audio) {
    chunks.push(chunk);
  }
  const audioBuffer = Buffer.concat(chunks);

  return new Response(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      // "Content-Length": audioBuffer.length.toString(),
    },
  });
}
export async function POST2(request: Request) {
  const { text } = await request.json();
  console.log("From the server,", text);
  if (!text) {
    return Response.json(
      {
        error: "Text is required",
      },
      { status: 400 }
    );
  }
  return Response.json({ text });
}
