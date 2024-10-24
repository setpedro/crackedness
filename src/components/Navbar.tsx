import Link from "next/link";
import React from "react";

export default function navbar() {
  return (
    <div className="fixed px-8 py-4 w-full h-16">
      <Link href="/" className="font-bold">CrackedLyzer</Link>
    </div>
  );
}
