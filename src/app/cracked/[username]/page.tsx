"use client";

import { User, Tweet, GptResponse } from "@/types";
import { api, cn, formatUserDetails, invariant } from "@/utils";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { parameters, titles } from "@/consts";
import LoadingSplash from "@/components/UI/LoadingSplash";
import { Modal } from "@/components/UI/Modal";
import ShareButton from "./components/ShareButton";
import Horseman from "./components/Horseman";

export default function Cracked() {
  const [isLoading, setIsLoading] = useState(false);
  const [conclusion, setConclusion] = useState("");
  const [scores, setScores] = useState<number[]>(Array(4).fill(0));
  const [title, setTitle] = useState("");
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const overall = scores.reduce((a, b) => a + b, 0) / scores.length;

  const pathname = usePathname();
  const username = pathname.replace("/cracked/", "");

  useEffect(() => {
    async function analyzeUser(): Promise<void> {
      try {
        setIsLoading(true);

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

        const gptResponse = await api.fetch<GptResponse>("gpt", {
          userDetails,
        });
        invariant(!gptResponse.error, gptResponse.error || "Analysis failed");

        const [conclusionLine, ...scoreLines] = gptResponse.data.completion
          .split("\n")
          .map((line: string) => line.trim());
        setConclusion(conclusionLine);

        const parsedScores = scoreLines.map((line: string) =>
          parseInt(line, 10)
        );
        setScores(parsedScores);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    analyzeUser();
  }, [pathname, username]);

  useEffect(() => {
    function titleSelector(score: number): string {
      const bracket = Math.floor(score / 10) * 10;
      return titles[bracket][Math.floor(Math.random() * 5)];
    }
    setTitle(titleSelector(overall));
  }, [overall]);

  function getDynamicGradient(score: number) {
    if (score >= 80) {
      return "high-score-gradient"; // Golden
    } else if (score >= 50) {
      return "mid-score-gradient"; // Green
    } else {
      return "low-score-gradient"; // Reddish
    }
  }

  if (isLoading) {
    return <LoadingSplash />;
  }

  return (
    <div className="h-screen border border-black flex flex-col items-center">
      <Navbar />
      <div className="my-auto flex flex-col items-center px-4 sm:px-20">
        <h1 className="text-3xl text-center sm:text-5xl font-extrabold">
          {title}
        </h1>
        <div className="flex flex-col gap-4 mt-10 rounded-md border-2 p-4 sm:p-8 max-w-[1024px] bg-foreground">
          <div
            className={cn(
              "text-2xl sm:text-4xl font-bold",
              getDynamicGradient(overall)
            )}
          >
            Overall: {overall}%
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full  sm:w-1/2">
              <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2">
                {parameters.map((x, i) => {
                  const dynamicGradient = getDynamicGradient(scores[i]);
                  return (
                    <Horseman
                      key={i}
                      x={x}
                      i={i}
                      onClick={() => setOpenModalIndex(i)}
                      dynamicGradient={dynamicGradient}
                      scores={scores}
                    />
                  );
                })}
                {openModalIndex !== null && (
                  <Modal
                    onClose={() => setOpenModalIndex(null)}
                    className="border"
                  >
                    <p className="py-2 px-4">
                      {parameters[openModalIndex].description}
                    </p>
                  </Modal>
                )}
              </div>
            </div>
            <span className="w-full h-0 sm:w-0 sm:min-h-full border" />
            <div className="w-full sm:w-1/2 font-bold">{conclusion}</div>
          </div>
        </div>
        <ShareButton title={title} />
      </div>

      <Footer />
    </div>
  );
}
