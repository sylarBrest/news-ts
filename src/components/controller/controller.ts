import AppLoader from './appLoader';
import type { Callback, OkNews, OkSources } from '../types/types';

class AppController extends AppLoader {
  public getSources(callback: Callback<OkSources>): void {
    this.getResp<OkSources>({ endpoint: 'sources' }, callback);
  }

  public getNews(e: Event, callback: Callback<OkNews>): void {
    let target: HTMLElement = <HTMLElement>e.target;
    const sourceContainer: HTMLElement = <HTMLElement>e.currentTarget;

    while (target !== sourceContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.dataset.sourceId;
        if (!sourceId) return;
        if (sourceContainer.dataset.source === sourceId) return;

        sourceContainer.dataset.source = sourceId;
        this.getResp<OkNews>(
          {
            endpoint: 'everything',
            options: {
              sources: sourceId,
            },
          },
          callback,
        );
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
