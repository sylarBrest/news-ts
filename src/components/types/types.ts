export type NewsDataArray = NewsData[];

export type NewsData = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
};

export type SourceDataArray = ReadonlyArray<Pick<SourceData, 'id' | 'name'>>;

export type SourceData = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type OkNews = {
  status: 'ok';
  articles: NewsDataArray;
  totalResults: number;
};

export type OkSources = {
  status: 'ok';
  sources: SourceDataArray;
};

export type ErrorResp = {
  status: 'error';
  code: string;
  message: string;
};

export type Data = OkNews | OkSources | ErrorResp;

export type Resp = {
  endpoint: string;
  options?: URLOptions;
};

export type Callback<T extends Data = Data> = (data: T) => void;

export type URLOptions = Record<string, string>;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
