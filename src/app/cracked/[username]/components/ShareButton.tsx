import Button from "@/components/UI/Button";
import Image from "next/image";

type Props = {
  title: string;
};

export default function ShareButton({ title }: Props) {
  function handleTwitterShare() {
    const shareUrl = "https://crackedlyzer.vercel.app";
    const shareText = `bro I'm a ${title}\nCheck out your crackedness level at`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterUrl, "_blank");
  }
  return (
    <Button
      onClick={handleTwitterShare}
      className="mt-6 flex items-center justify-center gap-2 w-full bg-white text-background"
    >
      Share on
      <Image src="/X.svg" alt={"X logo"} width={24} height={24} />
    </Button>
  );
}
