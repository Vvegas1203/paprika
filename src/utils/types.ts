export interface Word {
  id: number;
  module: string;
  topic: string;
  word: string;
  translation: string;
  image: string;
}

export type CardStatus = 'known' | 'learning' | null;

export type Screen = 'main' | 'modules' | 'topics' | 'cards';