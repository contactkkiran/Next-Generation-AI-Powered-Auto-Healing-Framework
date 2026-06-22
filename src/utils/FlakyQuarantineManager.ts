import { FrameworkLogger } from '../utils/FrameworkLogger';

export class FlakyQuarantineManager {
  private static quarantined = new Set<string>();

  static isQuarantined(test: string): boolean {
    const isPresent = this.quarantined.has(test);

    if (isPresent) {
      FrameworkLogger.log(`🚫 Test is quarantined: ${test}`);
    } else {
      FrameworkLogger.log(`✅ Test is not quarantined: ${test}`);
    }

    return isPresent;
  }

  static update(test: string, failed: boolean): void {
    if (failed) {
      this.quarantined.add(test);

      FrameworkLogger.log(`⚠️ Test moved to quarantine: ${test}`);
    } else {
      FrameworkLogger.log(`✅ Test executed successfully: ${test}`);
    }
  }

  static getQuarantinedTests(): string[] {
    return Array.from(this.quarantined);
  }
}
