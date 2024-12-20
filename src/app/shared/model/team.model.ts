import { Player } from "./player.model";

export const TEAMS = {
    YELLOW: 'yellow',
    BLACK: 'black'
} as const;
export type TeamSide = typeof TEAMS[keyof typeof TEAMS]

export type TeamPositions = 'attacker' | 'defender'

export type Team = Record<TeamPositions, Player['id']>