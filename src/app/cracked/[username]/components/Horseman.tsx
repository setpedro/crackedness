import { cn } from "@/utils";

type Props = {
  x: {
    title: string;
    description: string;
  };
  i: number;
  onClick: (i: number) => void;
  dynamicGradient:
    | "high-score-gradient"
    | "mid-score-gradient"
    | "low-score-gradient"; // TODO: fix this
  scores: number[];
};

export default function Horseman({
  x,
  i,
  onClick,
  dynamicGradient,
  scores,
}: Props) {
  return (
    <button
      key={x.title}
      onClick={() => onClick(i)}
      className="flex flex-col items-center sm:items-start md:items-center md:flex-row md:gap-2 font-bold hover:opacity-70 text-sm sm:text-lg md:text-xl lg:text-3xl py-4"
    >
      <div
        className={cn(
          "flex items-center gap-2 font-semibold whitespace-nowrap",
          dynamicGradient,
          "animated-gradient"
        )}
      >
        <p>{x.title}:</p>
      </div>
      <span className={cn("font-bold", dynamicGradient, "animated-gradient")}>
        {scores[i]}%
      </span>
    </button>
  );
}
