type TBookSections = {
  title: string;
  content: string;
}

type TBook = {
  audio_length: number;
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: TBookSections[];
}

export type {
  TBook,
  TBookSections
};