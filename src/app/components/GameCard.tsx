import type { Game } from "@/app/types/game";

import Link from "next/link";
import ImageWithBlur from "@/app/components/ImageWithBlur";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="relative w-full aspect-square group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 opacity-0 duration-300 group-hover:opacity-100 z-10" />
      <div className="p-4 absolute -translate-y-full duration-300 group-hover:translate-y-0 z-10">
        {game.name}
      </div>
      <ImageWithBlur
        src={game.content.thumbnailSquare.url}
        width={game.content.thumbnailSquare.width}
        height={game.content.thumbnailSquare.height}
        alt={game.content.thumbnailSquare.altText || game.name}
        className="duration-300 group-hover:blur-md group-hover:scale-110"
      />
      <div className="p-4 absolute bottom-0 translate-y-full group-hover:translate-y-0 duration-300 z-10">
        {game.provider}
      </div>
    </Link>
  );
}
