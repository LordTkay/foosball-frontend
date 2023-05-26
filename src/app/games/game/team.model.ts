import { Player } from "../../players/player/player.model";

export const TEAMS = {
  YELLOW: 'yellow',
  BLACK: 'black'
} as const
export type Teams = typeof TEAMS[keyof typeof TEAMS]

export type Team = {
  attacker: Player,
  defender: Player
}
