import { DOMElement } from '../models/DOMElement';

/**
 * Calculates similarity between historical
 * and current DOM elements for locator healing.
 */
export class DOMSimilarityEngine {
  private static readonly TAG_SCORE = 20;
  private static readonly TEXT_SCORE = 40;
  private static readonly ID_SCORE = 25;
  private static readonly CLASS_SCORE = 15;

  /**
   * Calculates overall DOM similarity score.
   */
  calculateSimilarity(oldElement: DOMElement, newElement: DOMElement): number {
    return (
      this.compareTagName(oldElement, newElement) +
      this.compareText(oldElement, newElement) +
      this.compareId(oldElement, newElement) +
      this.compareClassName(oldElement, newElement)
    );
  }

  private compareTagName(oldElement: DOMElement, newElement: DOMElement): number {
    return oldElement.tagName === newElement.tagName ? DOMSimilarityEngine.TAG_SCORE : 0;
  }

  private compareText(oldElement: DOMElement, newElement: DOMElement): number {
    return oldElement.text === newElement.text ? DOMSimilarityEngine.TEXT_SCORE : 0;
  }

  private compareId(oldElement: DOMElement, newElement: DOMElement): number {
    return oldElement.id === newElement.id ? DOMSimilarityEngine.ID_SCORE : 0;
  }

  private compareClassName(oldElement: DOMElement, newElement: DOMElement): number {
    return oldElement.className === newElement.className ? DOMSimilarityEngine.CLASS_SCORE : 0;
  }
}
