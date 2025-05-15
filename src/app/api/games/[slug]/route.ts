import type { Game } from '@/app/types/game'

import { NextResponse } from 'next/server';
import games from '@/app/mocks/games.json'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const game = (games as Game[]).find((game) => game.slug === slug);

  return game ? NextResponse.json(game) : NextResponse.json({ message: 'Game not found' }, { status: 404 })
}
