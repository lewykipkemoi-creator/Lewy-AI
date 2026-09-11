export async function GET() {
  return Response.json({
    ok: true,
    service: "Lewy AI",
    timestamp: new Date().toISOString()
  });
}
