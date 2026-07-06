export interface DOMSnapshotModel {
  elementName: string;

  locator: string;

  tag?: string;

  text?: string;

  html?: string;

  capturedOn: string;
}
