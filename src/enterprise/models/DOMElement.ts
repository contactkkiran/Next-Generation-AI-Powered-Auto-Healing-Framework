/**
 * Represents extracted DOM element metadata
 * used for locator healing and similarity matching.
 */
export interface DOMElement {
  tagName: string;
  text?: string;
  id?: string;
  className?: string;
  name?: string;
  type?: string;
  attributes?: Record<string, string>;
}
