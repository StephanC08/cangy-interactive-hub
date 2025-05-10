
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type PredefinedResponses = Record<string, string>;

export interface ChatBotProps {
  fullWidth?: boolean;
}

export interface ChatResponseData {
  response: string;
  redirect?: boolean;
}

export interface QuickOption {
  label: string;
  action: string;
}
