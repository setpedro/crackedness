export async function POST(req: Request) {
  const { userId } = await req.json();

  const URL = `https://api.socialdata.tools/twitter/user/${userId}/tweets`;

  const res: any = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SOCIALDATA_API_KEY}`,
      Accept: "application/json",
    },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data.tweets));
}
