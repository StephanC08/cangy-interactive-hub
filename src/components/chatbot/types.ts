
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type PredefinedResponses = Record<string, string>;
