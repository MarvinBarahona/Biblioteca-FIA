import { Copy } from './../../ejemplares';

import { Catalog } from './';

export class Book{
  id: number;
  isbn: string;
  title: string;
  edition: number;
  authors: string[];
  author: string;
  publisher: string;
  country: string;
  year: number;
  catalogued: boolean;
  catalog: Catalog;
  copies: Copy[];
}
