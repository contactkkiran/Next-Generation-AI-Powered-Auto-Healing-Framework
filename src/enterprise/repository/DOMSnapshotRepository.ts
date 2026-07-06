import * as fs from 'fs';
import { DOMSnapshotModel } from '../models/DOMSnapshotModel';

/**
 * Handles loading and converting DOM snapshots
 * used for locator healing.
 */
export class DOMSnapshotRepository {
  private static readonly SNAPSHOT_FILE = 'dom-snapshots.json';

  /**
   * Loads available DOM snapshots.
   */
  static loadSnapshots(): DOMSnapshotModel[] {
    // Check whether snapshot file exists
    if (!DOMSnapshotRepository.snapshotFileExists()) {
      console.log('No DOM snapshot file found');

      return [];
    }

    // Read file contents
    const fileContents = DOMSnapshotRepository.readSnapshotFile();

    // Convert JSON data into snapshot models
    return DOMSnapshotRepository.convertToSnapshots(fileContents);
  }

  private static snapshotFileExists(): boolean {
    return fs.existsSync(DOMSnapshotRepository.SNAPSHOT_FILE);
  }

  private static readSnapshotFile(): string {
    return fs.readFileSync(DOMSnapshotRepository.SNAPSHOT_FILE, 'utf8');
  }

  private static convertToSnapshots(fileContents: string): DOMSnapshotModel[] {
    return fileContents
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => JSON.parse(line) as DOMSnapshotModel);
  }
}
