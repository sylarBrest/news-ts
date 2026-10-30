import News from './news/news';
import Sources from './sources/sources';
import type { OkNews, OkSources } from '../types/types';

class AppView {
  private readonly news: News;
  private readonly sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: OkNews): void {
    this.news.draw(data.articles);
  }

  public drawSources(data: OkSources): void {
    this.sources.draw(data.sources);
  }
}

export default AppView;
