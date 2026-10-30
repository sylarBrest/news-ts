import type { Resp, Callback, URLOptions, Data } from '../types/types';
import { HttpMethod } from '../types/types';

interface ILoader {
  getResp<T extends Data = Data>({ endpoint, options }: Resp, callback: Callback<T>): void;
}

class Loader implements ILoader {
  private readonly baseLink: string;
  private readonly options: URLOptions;

  constructor(baseLink: string, options: URLOptions = {}) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T extends Data = Data>({ endpoint, options = {} }: Resp, callback: Callback<T>): void {
    this.load<T>(HttpMethod.GET, endpoint, callback, options);
  }

  private readonly errorHandler = (res: Response): Response => {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        throw new Error(`Auth/not found: ${res.status} ${res.statusText}`);
      }
      throw new Error(`HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ''}`);
    }

    return res;
  };

  private makeUrl(queryOptions: URLOptions, endpoint: string): string {
    const params = new URLSearchParams({ ...this.options, ...queryOptions }).toString();

    return `${this.baseLink}${endpoint}${params ? `?${params}` : ''}`;
  }

  private load<T extends Data = Data>(
    method: HttpMethod,
    endpoint: string,
    callback: Callback<T>,
    options: URLOptions = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json() as Promise<Data>)
      .then((data: Data) => {
        if (data.status !== 'ok') {
          throw new Error(`API error: ${data.status}`);
        }
        callback(data as T);
      })
      .catch((err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error(errorMessage);
      });
  }
}

export default Loader;
