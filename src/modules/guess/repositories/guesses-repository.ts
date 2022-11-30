export interface GuessesRepository {
  count: () => Promise<number>;
}
