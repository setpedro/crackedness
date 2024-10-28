export async function POST(req: Request) {
  const { userId } = await req.json();
  const URL = `https://api.socialdata.tools/twitter/user/${userId}/tweets`;
  const headers = {
    Authorization: `Bearer ${process.env.SOCIALDATA_API_KEY}`,
    Accept: "application/json",
  };

  const tweets = [];
  let cursor = null;

  try {
    while (tweets.length < 63) {
      const response: any = await fetch(
        `${URL}${cursor ? `?cursor=${cursor}` : ""}`,
        { headers },
      );

      const data = await response.json();
      if (!data.tweets || data.tweets.length === 0) break;

      tweets.push(...data.tweets);
      cursor = data.next_cursor;
      if (!cursor) break;
    }

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tweets" }), {
      status: 500,
    });
  }
}
