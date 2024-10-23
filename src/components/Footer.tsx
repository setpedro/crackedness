import React from "react";

export default function Footer() {
  return (
    <div className="mt-auto py-2 mx-auto flex gap-2 text-sm">
      <div className="flex gap-2">
        <p>Made by</p>
        <a href="https://x.com/_setPedro" className="hover:opacity-70">
          @_setPedro
        </a>
      </div>
      <div className="flex gap-2">
        <p>Inspired by</p>
        <a href="https://www.auralized.com/" className="hover:opacity-70">
          auralized.com
        </a>
      </div>
    </div>
  );
}
