class Publisher{
  id: number;
  name: string;
}

class NewAuthor{
  name: string;
}

export class NewBook{
  isbn: string;
  title: string;
  edition: number;
  authorName: string;
  publisher: Publisher;
  year: number;
  country: string;
  authors: number[];
  newAuthors: NewAuthor[];
}
