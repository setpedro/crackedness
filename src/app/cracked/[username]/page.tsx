"use client";

import { cn } from "@/utils";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { parameters, titles } from "@/consts";
import LoadingSplash from "@/components/UI/LoadingSplash";
import { Modal } from "@/components/UI/Modal";
import ShareButton from "./components/ShareButton";
import Horseman from "./components/Horseman";
import { analyzeUser } from "@/services/user";

export default function Cracked() {
  const [isLoading, setIsLoading] = useState(false);
  const [conclusion, setConclusion] = useState("");
  const [scores, setScores] = useState<number[]>(Array(4).fill(0));
  const [title, setTitle] = useState("");
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const pathname = usePathname();
  const username = pathname.replace("/cracked/", "");
  const overall = scores.reduce((a, b) => a + b, 0) / scores.length;

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      try {
        const { conclusion, scores } = await analyzeUser(username);
        setConclusion(conclusion);
        setScores(scores);
      } catch (error) {
        // Error already logged in service
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [username]);

  useEffect(() => {
    function titleSelector(score: number): string {
      const bracket = Math.floor(score / 10) * 10;
      return titles[bracket][Math.floor(Math.random() * 10)];
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
