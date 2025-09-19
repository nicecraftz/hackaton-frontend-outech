export type History = {
  messages: Message[];
};

export type Message = {
  ai: boolean;
  text: string;
};

export type Response = {
  text: string;
};
