export type User = {
  id: number;
  username: string;
  score: Score;
};

export type Score = {
  id: number;
  userId: number;
  points: number;
  currentStreak: number;
};

export type UpdateUserScore = {
  username: string;
  points: number;
  currentStreak: number;
};
