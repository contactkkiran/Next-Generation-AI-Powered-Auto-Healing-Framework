/**
 * Represents locator metadata used for
 * storage, healing, and reliability tracking.
 */
export interface Locator {
  elementName: string;
  locator: string;
  pageName: string;
  successCount: number;
}
