"use client";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      router.push(`/cracked/${username}`);
    });
  }

  return (
    <div className="h-screen border border-black flex flex-col items-center">
      <Navbar />
      <div className="px-20 my-auto flex flex-col gap-10">
        <h1 className="text-3xl sm:text-5xl text-center font-extrabold">
          Get your crackedness score
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
          <Button type="submit" disabled={username.length === 0}>
            Analyze your crackedness
          </Button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
