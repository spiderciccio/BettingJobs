import type { Metadata } from "next";
import type { Game } from "@/app/types/game";
import type { AvailableFilter } from "@/app/types/listing";

import { getGames } from "@/app/services/gameService";
import { fetchWithError } from "@/app/utils/fetchWithError";

import GamesClient from "./GamesClient";

export const metadata: Metadata = {
  title: "Browse Games",
};

export default async function Games({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryString = await searchParams;
  const query = `${queryString.q || ""}`;
  const page = Number.parseInt(`${queryString.page || "1"}`);
  const filters = JSON.parse(`${queryString.f || "{}"}`);

  const [data, error] = await fetchWithError(
    getGames({ query, filters, page })
  );

  const {
    games,
    availableFilters,
    pagination: { total },
  } = data ?? {
    games: [] as Game[],
    availableFilters: [] as AvailableFilter[],
    pagination: { total: 1 },
  };

  return (
    <GamesClient
      games={games}
      query={query}
      page={page}
      totalPage={total}
      availableFilters={availableFilters}
      filters={filters}
      error={error?.message}
    />
  );
}
