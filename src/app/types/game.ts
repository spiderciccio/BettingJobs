export interface Thumbnail {
  url: string;
  altText: string;
  height: number;
  width: number;
}

export interface Content {
  thumbnail: Thumbnail;
  thumbnailSquare: Thumbnail;
  thumbnailPortrait: Thumbnail;
  thumbnailLandscape: Thumbnail;
}

export interface JackpotValue {
  value: number;
  currencyCode: string;
  currencySymbol: string;
}

export enum GameType {
  Slots = "Slots",
  TableGames = "TableGames",
  VirtualSports = "VirtualSports",
}

export type LaunchType = 'Default' | 'Lobby';

export interface Game {
  id: string;
  name: string;
  shouldShowJackpot: boolean;
  isHot: boolean;
  hasMobileVersion: boolean;
  isNew: boolean;
  isMiniGame: boolean;
  sortOrder: number;
  provider: string;
  primaryType: GameType;
  gameTypes: GameType[];
  primaryVariantId: string;
  slug: string;
  gameVariants: string[];
  collections: string[];
  content: Content;
  metaTags: string[];
  jackpotValue?: JackpotValue;
  contentKey: string;
  gameStudio: string;
  launchType: LaunchType;
  isAvailableForFun: boolean;
}

export type Games = Game[];