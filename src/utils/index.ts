import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User, Tweet, ApiResponse } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatUserInfo = (user: User): string => `
User Info
Name ${user.name}
Bio ${user.description}
Followers ${user.followers_count}
Tweets ${user.statuses_count}
Joined ${user.created_at}
`;

export const formatUserDetails = (user: User, tweets: Tweet[]): string => `
${formatUserInfo(user)}

Recent Tweets
${tweets.map((x) => x.full_text).join("\n\n")}
`;

export const api = {
  async fetch<T>(endpoint: string, data: object): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      invariant(response.ok, `API error: ${response.statusText}`);

      const responseData = await response.json();
      return { data: responseData };
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};

export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new Error(`Invariant failed: ${message}`);
  }
}
