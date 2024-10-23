export async function POST(req: Request) {
  const { username } = await req.json();

  const res = await fetch(
    `https://api.socialdata.tools/twitter/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SOCIALDATA_API_KEY}`,
        Accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
