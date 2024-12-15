import { TeamPositions, TeamSide } from "../model/team.model";
import { Player } from "../../players/model/player.model";

export type PlayersPerTeam = Record<TeamSide, Record<TeamPositions, Player>>