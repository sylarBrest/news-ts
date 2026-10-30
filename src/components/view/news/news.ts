import './news.css';
import type { NewsDataArray } from '../../types/types';

interface INews {
  draw(data: NewsDataArray): void;
}

class News implements INews {
  public draw(data: NewsDataArray) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (!newsItemTemp) return;

    const newsItem = newsItemTemp;
    news.forEach((item, idx) => {
      const newsClone = newsItem.content.cloneNode(true) as DocumentFragment;

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
      if (metaPhoto) {
        metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.png'})`;
      }

      const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
      if (metaAuthor) {
        metaAuthor.textContent = item.author || item.source.name;
      }

      const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
      if (metaDate) {
        metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      }

      const descriptionTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
      if (descriptionTitle) descriptionTitle.textContent = item.title;

      const descriptionSource = newsClone.querySelector<HTMLElement>('.news__description-source');
      if (descriptionSource) descriptionSource.textContent = item.source.name;

      const descriptionContent = newsClone.querySelector<HTMLElement>('.news__description-content');
      if (descriptionContent) descriptionContent.textContent = item.description;

      newsClone.querySelector<HTMLAnchorElement>('.news__read-more a')?.setAttribute('href', item.url);

      fragment.append(newsClone);
    });
    const newsElement = document.querySelector<HTMLElement>('.news');
    if (!newsElement) return;
    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
