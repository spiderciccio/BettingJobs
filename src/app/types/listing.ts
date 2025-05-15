import { Game } from './game';

export interface AvailableFilter {
  value: keyof Game;
  label: string;
  options: { label: string; value: string }[]
}
