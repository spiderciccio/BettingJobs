import type { Game } from "@/app/types/game";
import type { AvailableFilter } from "@/app/types/listing";

const API_BASE_URL = '/api/games'

export interface GameResponse {
  games: Game[],
  availableFilters: AvailableFilter[],
  pagination: { current: number, total: number }
}


export const getGames = async ({ filters = {}, query = '', page = 1 }: {
  filters: Record<string, string[]>,
  query: string,
  page: number
}): Promise<GameResponse> => {
  const url = new URL(API_BASE_URL, process.env.NEXT_PUBLIC_BASE_URL)
  if (query) url.searchParams.append('q', query)
  if (page) url.searchParams.append('page', `${page}`)
  if (Object.keys(filters).length) url.searchParams.append('filters', JSON.stringify(filters))

  const res = await fetch(url.toString(), {
    cache: 'force-cache'
  })
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data: GameResponse = await res.json()
  return data
}

export const getGame = async (slug: string): Promise<Game> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${API_BASE_URL}/${slug}`, {
    cache: 'force-cache'
  })
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const game: Game = await res.json()
  return game
}