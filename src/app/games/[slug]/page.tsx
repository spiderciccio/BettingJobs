import type { Game } from "@/app/types/game";
import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getGame } from "@/app/services/gameService";
import { fetchWithError } from "@/app/utils/fetchWithError";

import ImageWithBlur from "@/app/components/ImageWithBlur";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const [game] = await fetchWithError(getGame(slug));

  if (game) {
    return {
      title: game.name,
      openGraph: {
        images: [game.content.thumbnail.url],
      },
    };
  }
  return {
    title: "Game not found",
  };
}

export default async function Game({ params }: { params: Params }) {
  const { slug } = await params;

  const [game] = await fetchWithError(getGame(slug));

  if (!game) return notFound();

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* HERO SECTION */}
      <div className="relative w-full">
        <ImageWithBlur
          src={game.content.thumbnailLandscape.url}
          alt={game.content.thumbnailLandscape.altText || game.name}
          width={game.content.thumbnailLandscape.width}
          height={game.content.thumbnailLandscape.height}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black flex items-end p-6">
          <h1 className="text-3xl sm:text-4xl font-bold">{game.name}</h1>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Game Details</h2>
            <p className="text-gray-400">Type: {game.primaryType}</p>
            <p className="text-gray-400">
              Provider: {game.provider.replace("Casino", "")}
            </p>
            <p className="text-gray-400">Studio: {game.gameStudio}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Availability</h2>
            <p className="text-gray-400">
              {game.isAvailableForFun ? "Demo" : "Play with real money"}
            </p>
          </div>

          {game.gameVariants.length && (
            <div>
              <h2 className="text-xl font-semibold">Variants</h2>
              <ul className="text-gray-400 list-disc list-inside">
                {game.gameVariants.map((variant) => (
                  <li key={variant}>{variant}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* SIDEBAR ACTION */}
        <div className="space-y-4">
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-lg cursor-pointer"
          >
            {game.isAvailableForFun ? "Play with Demo" : "Play Now"}
          </button>

          {/* Optional badges */}
          {(game.isHot || game.isNew || game.shouldShowJackpot) && (
            <div className="space-y-2">
              {game.isHot && (
                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  HOT
                </span>
              )}
              {game.isNew && (
                <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {game.shouldShowJackpot && (
                <span className="inline-block bg-yellow-500 text-black text-xs px-3 py-1 rounded-full">
                  JACKPOT
                </span>
              )}
            </div>
          )}

          <ImageWithBlur
            src={game.content.thumbnailSquare.url}
            alt={game.content.thumbnailSquare.altText || game.name}
            width={game.content.thumbnailSquare.width}
            height={game.content.thumbnailSquare.height}
            className="w-full h-auto rounded-lg border border-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
