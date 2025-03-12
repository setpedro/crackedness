import { User, Tweet, GptResponse } from "@/types";
import { api, formatUserDetails, invariant } from "@/utils";

export async function analyzeUser(username: string): Promise<{
  conclusion: string;
  scores: number[];
}> {
  try {
    const userResponse = await api.fetch<User>("user", { username });
    invariant(
      !userResponse.error,
      userResponse.error || "Failed to fetch user data"
    );
    invariant(userResponse.data, "No user data received");

    const tweetsResponse = await api.fetch<Tweet[]>("tweets", {
      userId: userResponse.data.id_str,
    });
    invariant(
      !tweetsResponse.error,
      tweetsResponse.error || "Failed to fetch tweets"
    );
    invariant(tweetsResponse.data, "No tweet data received");

    const userDetails = formatUserDetails(
      userResponse.data,
      tweetsResponse.data
    );

    const gptResponse = await api.fetch<GptResponse>("gpt", { userDetails });
    invariant(!gptResponse.error, gptResponse.error || "Analysis failed");

    const [conclusionLine, ...scoreLines] = gptResponse.data.completion
      .split("\n")
      .map((line: string) => line.trim());

    const scores = scoreLines.map((line: string) => parseInt(line, 10));

    return {
      conclusion: conclusionLine,
      scores,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
