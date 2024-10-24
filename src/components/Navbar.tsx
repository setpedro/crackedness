import Link from "next/link";

export default function navbar() {
  return (
    <div className="w-full flex items-center bg-background">
      <Link
        href="/"
        className="font-bold sm:text-lg xl:text-xl px-8 py-4 rounded-br-md"
      >
        CrackedLyzer
      </Link>
    </div>
  );
}
