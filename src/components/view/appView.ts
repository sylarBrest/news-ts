import News from './news/news';
import Sources from './sources/sources';
import type { OkNews, OkSources } from '../types/types';

interface IAppView {
  drawNews(data: OkNews): void;
  drawSources(data: OkSources): void;
}

class AppView implements IAppView {
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
