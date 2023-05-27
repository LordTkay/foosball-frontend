import { Player } from '../../players/player/player.model';

export const TEAMS = {
  YELLOW: 'yellow',
  BLACK: 'black'
} as const;
export type Teams = typeof TEAMS[keyof typeof TEAMS]

export type TeamPositions = 'attacker' | 'defender'

export type Team = Record<TeamPositions, Player['id']>
