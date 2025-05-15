import type { Game } from '@/app/types/game'

import { NextResponse } from 'next/server'
import games from '@/app/mocks/games.json'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const searchByText = (searchParams.get('q') || '').toLowerCase();
  const limit = Number.parseInt(searchParams.get('limit') || '15');
  const currentPage = Number.parseInt(searchParams.get('page') || '1');
  const filters: Record<string, string[]> = JSON.parse(searchParams.get('filters') || '{}');

  const filtersGames: Game[] = [];

  const availableFilters: {
    value: keyof Game,
    label: string,
    options: { label: string; value: string }[]
  }[] = [
      {
        value: 'provider',
        label: 'Provider',
        options: []
      },
      {
        value: 'collections',
        label: 'Collections',
        options: []
      },
      {
        value: 'gameTypes',
        label: 'Game Types',
        options: []
      },
    ];

  const filterCache: { [key: string]: Set<string> } = {} = {};

  const buildAvailableFilter = (game: Game) => {
    for (const availableFilter of availableFilters) {
      const key = availableFilter.value
      if (!filterCache[key]) {
        filterCache[key] = new Set();
      }
      const options = game[key]
      if (!options) continue
      if (Array.isArray(options)) {
        options.forEach(item => filterCache[key].add(item))
      } else {
        filterCache[key].add(options as string)
      }
    }
  }

  (games as Game[]).forEach(game => {
    // 1. search by text name
    if (!game.name.toLowerCase().includes(searchByText)) return false

    // 2. search by filters
    for (const key in filters) {
      const options = (game[key as keyof Game] || '') as string | string[]
      const isMatch = (Array.isArray(options) ? options : [options]).some(item => filters[key].includes(item))
      if (!isMatch) return false
    }

    filtersGames.push(game)
    buildAvailableFilter(game)
  })

  const printAvailableFilters = () => {
    availableFilters.forEach((availableFilter) => {
      const key = availableFilter.value
      if (filterCache[key]?.size)
        availableFilter.options = Array.from(filterCache[key]).map(item => ({
          label: item,
          value: item
        }))
    })
    return availableFilters
  }

  return NextResponse.json({
    games: filtersGames.slice((currentPage - 1) * limit, currentPage * limit),
    availableFilters: printAvailableFilters(),
    pagination: { current: currentPage, total: Math.floor(filtersGames.length / limit) + 1 }
  });
}