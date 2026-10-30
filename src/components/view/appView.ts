import News from './news/news';
import Sources from './sources/sources';
import type { Data } from '../types/types';

class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: Data): void {
    if (!('articles' in data)) return;
    this.news.draw(data.articles);
  }

  public drawSources(data: Data): void {
    if (!('sources' in data)) return;
    this.sources.draw(data.sources);
  }
}

export default AppView;
