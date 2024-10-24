export default function Footer() {
  return (
    <div className="w-full text-center mt-auto py-2 mx-auto text-xs sm:text-sm">
      <div className="flex gap-2 items-center justify-center">
        <div className="flex">
          Made by
          <a href="https://x.com/_setPedro" className="ml-1.5 hover:opacity-70">
            @_setPedro
          </a>
          .
        </div>
        <div className="flex">
          <p>Inspired by</p>
          <a
            href="https://www.auralized.com/"
            className="ml-1.5 hover:opacity-70"
          >
            auralized.com
          </a>
        </div>
      </div>
    </div>
  );
}
