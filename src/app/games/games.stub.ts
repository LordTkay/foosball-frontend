import { Game } from './game/game.model';

const additionalGames: Game[] = [
  {
    id: 3,
    playDate: new Date(2023, 4, 28, 14, 30, 0),
    teams: {
      yellow: { attacker: 1, defender: 2 },
      black: { attacker: 0, defender: 3 }
    },
    scores: { black: 2, yellow: 3 },
    winner: 'yellow'
  },
  {
    id: 4,
    playDate: new Date(2023, 4, 29, 16, 45, 0),
    teams: {
      yellow: { attacker: 2, defender: 3 },
      black: { attacker: 0, defender: 1 }
    },
    scores: { black: 4, yellow: 2 },
    winner: 'black'
  },
  {
    id: 5,
    playDate: new Date(2023, 4, 30, 18, 15, 0),
    teams: {
      yellow: { attacker: 1, defender: 3 },
      black: { attacker: 0, defender: 2 }
    },
    scores: { black: 1, yellow: 1 },
    winner: 'draw'
  },
  {
    id: 6,
    playDate: new Date(2023, 5, 1, 10, 0, 0),
    teams: {
      yellow: { attacker: 2, defender: 0 },
      black: { attacker: 1, defender: 3 }
    },
    scores: { black: 3, yellow: 2 },
    winner: 'black'
  },
  {
    id: 7,
    playDate: new Date(2023, 5, 2, 11, 30, 0),
    teams: {
      yellow: { attacker: 3, defender: 1 },
      black: { attacker: 0, defender: 2 }
    },
    scores: { black: 4, yellow: 4 },
    winner: 'draw'
  },
  {
    id: 8,
    playDate: new Date(2023, 5, 3, 13, 0, 0),
    teams: {
      yellow: { attacker: 0, defender: 2 },
      black: { attacker: 1, defender: 3 }
    },
    scores: { black: 3, yellow: 5 },
    winner: 'yellow'
  },
  {
    id: 9,
    playDate: new Date(2023, 5, 4, 15, 15, 0),
    teams: {
      yellow: { attacker: 1, defender: 3 },
      black: { attacker: 0, defender: 2 }
    },
    scores: { black: 1, yellow: 2 },
    winner: 'yellow'
  },
  {
    id: 10,
    playDate: new Date(2023, 5, 5, 16, 45, 0),
    teams: {
      yellow: { attacker: 0, defender: 1 },
      black: { attacker: 2, defender: 3 }
    },
    scores: { black: 4, yellow: 4 },
    winner: 'draw'
  },
  {
    id: 11,
    playDate: new Date(2023, 5, 6, 9, 30, 0),
    teams: {
      yellow: { attacker: 3, defender: 2 },
      black: { attacker: 1, defender: 0 }
    },
    scores: { black: 3, yellow: 2 },
    winner: 'black'
  },
  {
    id: 12,
    playDate: new Date(2023, 5, 7, 12, 0, 0),
    teams: {
      yellow: { attacker: 0, defender: 3 },
      black: { attacker: 2, defender: 1 }
    },
    scores: { black: 1, yellow: 1 },
    winner: 'draw'
  },
  {
    id: 13,
    playDate: new Date(2023, 5, 8, 14, 45, 0),
    teams: {
      yellow: { attacker: 2, defender: 0 },
      black: { attacker: 3, defender: 1 }
    },
    scores: { black: 2, yellow: 4 },
    winner: 'yellow'
  },
  {
    id: 14,
    playDate: new Date(2023, 5, 9, 16, 15, 0),
    teams: {
      yellow: { attacker: 3, defender: 2 },
      black: { attacker: 0, defender: 1 }
    },
    scores: { black: 3, yellow: 3 },
    winner: 'draw'
  },
  {
    id: 15,
    playDate: new Date(2023, 5, 10, 9, 0, 0),
    teams: {
      yellow: { attacker: 0, defender: 3 },
      black: { attacker: 1, defender: 2 }
    },
    scores: { black: 2, yellow: 4 },
    winner: 'yellow'
  },
  {
    id: 16,
    playDate: new Date(2023, 5, 11, 10, 45, 0),
    teams: {
      yellow: { attacker: 2, defender: 1 },
      black: { attacker: 0, defender: 3 }
    },
    scores: { black: 1, yellow: 2 },
    winner: 'yellow'
  },
  {
    id: 17,
    playDate: new Date(2023, 5, 12, 12, 30, 0),
    teams: {
      yellow: { attacker: 1, defender: 3 },
      black: { attacker: 2, defender: 0 }
    },
    scores: { black: 3, yellow: 2 },
    winner: 'black'
  },
  {
    id: 18,
    playDate: new Date(2023, 5, 13, 14, 15, 0),
    teams: {
      yellow: { attacker: 3, defender: 2 },
      black: { attacker: 0, defender: 1 }
    },
    scores: { black: 4, yellow: 4 },
    winner: 'draw'
  },
  {
    id: 19,
    playDate: new Date(2023, 5, 14, 16, 0, 0),
    teams: {
      yellow: { attacker: 0, defender: 2 },
      black: { attacker: 1, defender: 3 }
    },
    scores: { black: 1, yellow: 3 },
    winner: 'yellow'
  },
  {
    id: 20,
    playDate: new Date(2023, 5, 15, 10, 30, 0),
    teams: {
      yellow: { attacker: 1, defender: 3 },
      black: { attacker: 0, defender: 2 }
    },
    scores: { black: 2, yellow: 2 },
    winner: 'draw'
  }
];

export const gamesStub = new Map<Game['id'], Game>([

  [0, {
    id: 0,
    playDate: new Date(2023, 4, 20, 12, 30, 25),
    teams: {
      yellow: { attacker: 1, defender: 1 },
      black: { attacker: 2, defender: 2 }
    },
    scores: { black: 0, yellow: 6 },
    winner: 'yellow'
  }],

  [1, {
    id: 1,
    playDate: new Date(2023, 4, 26, 13, 45, 30),
    teams: {
      yellow: { attacker: 1, defender: 2 },
      black: { defender: 3, attacker: 4 }
    },
    scores: { black: 4, yellow: 6 },
    winner: 'yellow'
  }],

  [2, {
    id: 2,
    playDate: new Date(2023, 4, 26, 15, 36, 15),
    teams: {
      yellow: { attacker: 1, defender: 2 },
      black: { defender: 3, attacker: 4 }
    },
    scores: { black: 10, yellow: 6 },
    winner: 'black'
  }],

  ...additionalGames.map((game, index) => [game.id, game] as [Game['id'], Game])

])


