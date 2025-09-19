export type Heritage = {
  id: number;
  location: Location;
  name: string;
  description: string;
  category: Category;
  inscribedDate: string;
  images: HeritageImage[];
};

export type Location = {
  id: number;
  longitude: number;
  latitude: number;
  state: string;
  region: string;
};

export type Category = {
  id: number;
  name: string;
};

export type HeritageImage = {
  id: number;
  heritageId: number;
  date: string;
  dateAccessed: string;
  author: string;
  copyright: string;
  source: string;
  link: string;
  license: string;
  filePath: string;
};
