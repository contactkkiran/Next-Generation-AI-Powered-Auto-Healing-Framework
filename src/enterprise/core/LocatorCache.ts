export class LocatorCache {
  private static cache = new Map<string, string>();

  static put(key: string, locator: string): void {
    this.cache.set(key, locator);

    console.log(`📦 Cached locator: ${key}`);
  }

  static get(key: string): string | undefined {
    return this.cache.get(key);
  }

  static has(key: string): boolean {
    return this.cache.has(key);
  }

  static clear(): void {
    this.cache.clear();

    console.log('🗑 Cache cleared');
  }
}
