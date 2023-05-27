import { Player } from './player.model';

export const playersStub = new Map<Player['id'], Player>([
  { id: 0, firstName: 'Tobias', lastName: 'Wagner', email: 'Tobias.Wagner@MetallRente-Services.de' },
  { id: 1, firstName: 'Gareth', lastName: 'Schmutz' },
  { id: 2, firstName: 'Sven', lastName: 'Hanl' },
  { id: 3, firstName: 'Robert', lastName: 'Kansy' },
  { id: 4, firstName: 'Elmer', lastName: 'Christmann' },
].map(player => [player.id, player]))
