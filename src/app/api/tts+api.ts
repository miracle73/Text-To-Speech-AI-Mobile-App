export function GET(request: Request) {
  return Response.json({ hello: "world" });
}

export async function POST(request: Request) {
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
