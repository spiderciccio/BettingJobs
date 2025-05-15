"use client";

import type { Game } from "@/app/types/game";
import type { AvailableFilter } from "@/app/types/listing";

import { useEffect, useState, useRef } from "react";
import { getGames } from "@/app/services/gameService";
import { debounce } from "@/app/utils/debounce";
import { fetchWithError } from "@/app/utils/fetchWithError";

import Filters from "@/app/components/Filters";
import Pagination from "@/app/components/Pagination";
import GameCard from "@/app/components/GameCard";
import SearchIcon from "@/app/components/icons/SearchIcon";
import Skeleton from "@/app/components/Skeleton";

interface Props {
  games: Game[];
  query: string;
  page: number;
  totalPage: number;
  filters: Record<string, string[]>;
  availableFilters: AvailableFilter[];
  error?: string;
}

const updateHistory = (
  query: string,
  filters: Record<string, string[]>,
  page: number
) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q", query);
  if (Object.keys(filters).length)
    searchParams.append("f", JSON.stringify(filters));
  searchParams.append("page", page.toString());
  window.history.replaceState(null, "", `?${searchParams.toString()}`);
};

export default function GamesClient({
  games: initGames,
  query: searchText = "",
  page: initPage,
  totalPage: initTotalPage,
  availableFilters: initAvailableFilters,
  filters: initFilters,
  error: initError,
}: Props) {
  const [games, setGames] = useState(initGames);
  const [query, setQuery] = useState(searchText);
  const [page, setPage] = useState(initPage);
  const [totalPage, setTotalPage] = useState(initTotalPage);
  const [availableFilters, setAvailableFilters] =
    useState(initAvailableFilters);
  const [filters, setFilters] = useState(initFilters);
  const [error, setError] = useState(initError);
  const [loading, setLoading] = useState(false);

  // we want skip load games on mount because we work on SSR
  const skipLoad = useRef(true);

  useEffect(() => {
    if (error) {
      // [TODO] replace with a toast notification
      console.error("error", error);
    }
  }, [error]);

  useEffect(() => {
    if (skipLoad.current) return;

    const loadGames = async () => {
      setError("");

      setLoading(true);
      const [res, err] = await fetchWithError(
        getGames({ query: query, filters: filters, page: page })
      );

      if (res) {
        setGames(res.games);
        setAvailableFilters(res.availableFilters);
        setTotalPage(res.pagination.total);
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else if (err) {
        setError(err.message);
      }

      setLoading(false);
    };
    updateHistory(query, filters, page);
    loadGames();
  }, [query, page, filters]);

  const searchByText = debounce((text: string) => {
    skipLoad.current = false;
    setQuery(text);
    setPage(1);
    setFilters({});
  }, 300);

  const changeFilters = (newFilters: Record<string, string[]>) => {
    skipLoad.current = false;
    setFilters(newFilters);
    setPage(1);
  };

  const changePage = (newPage: number) => {
    skipLoad.current = false;
    setPage(newPage);
  };

  return (
    <>
      <div className="p-4 sticky top-0 z-20 bg-background flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative">
          <input
            type="search"
            className="pl-8 pr-4 py-2 border rounded w-full text-white"
            placeholder="Search..."
            onChange={(e) => searchByText(e.target.value)}
            defaultValue={query}
          />
          <SearchIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
        </div>

        <Filters
          className="flex flex-wrap gap-4 sticky top-0"
          filters={filters}
          availableFilters={availableFilters}
          onChange={changeFilters}
        />
      </div>

      <div className="px-4 max-w-7xl mx-auto">
        {loading || games.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading
              ? Array.from({ length: 15 }).map((_, i) => (
                  <Skeleton key={i} className="w-full aspect-square" />
                ))
              : games.map((game) => <GameCard game={game} key={game.id} />)}
          </div>
        ) : (
          <p className="h-[50vh] flex items-center justify-center text-2xl font-bold">
            {error
              ? "Something went wrong"
              : "Ops No game found, try another search"}
          </p>
        )}
      </div>
      {totalPage > 1 && (
        <Pagination
          className="py-8 sticky bottom-0 bg-background z-20"
          page={page}
          totalPage={totalPage}
          onChange={changePage}
        />
      )}
    </>
  );
}
