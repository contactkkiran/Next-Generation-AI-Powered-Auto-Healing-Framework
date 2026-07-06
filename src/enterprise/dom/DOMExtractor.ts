import { Page } from '@playwright/test';
import { DOMElement } from '../models/DOMElement';

/**
 * Extracts DOM elements from browser page.
 */
export class DOMExtractor {
  async extract(page: Page): Promise<DOMElement[]> {
    const elements = await page.$$eval('*', (nodes) =>
      nodes.map((node) => ({
        tagName: node.tagName.toLowerCase(),
        text: node.textContent?.trim() || '',
        id: (node as HTMLElement).id,
        className: (node as HTMLElement).className?.toString(),
        attributes: Array.from(node.attributes).reduce(
          (attributes, attribute) => {
            attributes[attribute.name] = attribute.value;
            return attributes;
          },
          {} as Record<string, string>,
        ),
      })),
    );

    return elements;
  }
}
