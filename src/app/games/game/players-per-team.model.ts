import { TeamPositions, TeamSide } from "../../shared/model/team.model";
import { Player } from "../../shared/model/player.model";

export type PlayersPerTeam = Record<TeamSide, Record<TeamPositions, Player>>