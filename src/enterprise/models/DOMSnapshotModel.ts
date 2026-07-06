/**
 * Represents historical DOM information captured
 * for locator recovery and AI-based healing.
 */
export interface DOMSnapshotModel {
  elementName: string;
  locator: string;
  tag?: string;
  text?: string;
  html?: string;
  capturedOn: string;
}
