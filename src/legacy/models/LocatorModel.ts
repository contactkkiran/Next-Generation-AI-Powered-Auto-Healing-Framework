// Enterprise Locator Model

export interface LocatorModel {
  elementName: string;

  primaryLocator: string;

  fallbackLocators: string[];

  pageName: string;

  confidence?: number;

  lastUpdated?: Date;
}
