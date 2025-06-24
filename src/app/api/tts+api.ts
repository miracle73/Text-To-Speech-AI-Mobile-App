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
  const voice = await client.voices.get("JBFqnCBsd6RMkjVDRZzb");
  console.log(voice.description, 88);
  try {
    const audio = await client.textToSpeech.convertAsStream(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }
    );

    const chunks = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);
    console.log("Audio buffer length:", audioBuffer.length);
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        // "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error occurred while converting text to speech:", error);
    return Response.json(
      {
        error: "Failed to generate audio",
      },
      { status: 500 }
    );
  }
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
