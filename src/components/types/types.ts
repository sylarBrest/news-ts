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

export type Data = {
    status: string;
    articles?: NewsDataArray;
    totalResults?: number;
    sources?: SourceDataArray;
};

export type HTMLEl = HTMLElement | null;

export type Resp = {
    endpoint: string;
    options?: URLOptions;
};

export type Callback = (data?: Data | string) => void;

export type URLOptions = Record<string, string>;
