import './sources.css';
import type { SourceDataArray } from '../../types/types';

interface ISources {
  draw(data: SourceDataArray): void;
}

class Sources implements ISources {
  public draw(data: SourceDataArray): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

        const itemNameElement = sourceClone.querySelector<HTMLElement>('.source__item-name');
        if (itemNameElement) itemNameElement.textContent = item.name;

        const itemElement = sourceClone.querySelector<HTMLElement>('.source__item');
        if (itemElement) itemElement.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      });
    }
    document.querySelector<HTMLElement>('.sources')?.append(fragment);
  }
}

export default Sources;
