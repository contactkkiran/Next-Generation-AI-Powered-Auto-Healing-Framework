export class FrameworkLogger {
  private static logs: string[] = [];

  static log(message: string) {
    console.log(message);

    this.logs.push(message);
  }

  static getLogs(): string {
    return this.logs.join('\n');
  }

  static clear() {
    this.logs = [];
  }
}
