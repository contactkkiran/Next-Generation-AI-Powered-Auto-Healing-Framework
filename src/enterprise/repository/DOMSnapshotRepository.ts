import * as fs from 'fs';
import { DOMSnapshotModel } from '../models/DOMSnapshotModel';

export class DOMSnapshotRepository {
  static loadSnapshots(): DOMSnapshotModel[] {
    const file = 'dom-snapshots.json';

    // Check whether file exists
    if (!fs.existsSync(file)) {
      console.log('⚠️ No DOM snapshot file found');

      return [];
    }

    // Read file contents
    const fileContents = fs.readFileSync(file, 'utf8');

    // Convert each JSON line into object
    const lines: string[] = fileContents

      .split('\n')

      .filter((line: string) => line.trim() !== '');

    const snapshots: DOMSnapshotModel[] = lines.map(
      (line: string) => JSON.parse(line) as DOMSnapshotModel,
    );

      return snapshots;
      
  }
}
