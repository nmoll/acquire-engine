export interface ISharesState {
  [playerId: string]: {
    ["American"]?: number;
    ["Continental"]?: number;
    ["Festival"]?: number;
    ["Imperial"]?: number;
    ["Luxor"]?: number;
    ["Tower"]?: number;
    ["Worldwide"]?: number;
  };
}
