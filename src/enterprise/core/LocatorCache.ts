/**
 * Handles in-memory locator caching.
 *
 * Reduces database lookups by storing
 * frequently used healed locators.
 */
export class LocatorCache {
  private static readonly cache = new Map<string, string>();

  /**
   * Stores locator in cache.
   */
  static put(key: string, locator: string): void {
    LocatorCache.cache.set(key, locator);

    console.log(`Locator cached: ${key}`);
  }

  /**
   * Retrieves locator from cache.
   */
  static get(key: string): string | undefined {
    return LocatorCache.cache.get(key);
  }

  /**
   * Checks whether locator exists.
   */
  static has(key: string): boolean {
    return LocatorCache.cache.has(key);
  }

  /**
   * Removes locator from cache.
   */
  static remove(key: string): void {
    LocatorCache.cache.delete(key);

    console.log(`Locator removed from cache: ${key}`);
  }

  /**
   * Clears complete locator cache.
   */
  static clear(): void {
    LocatorCache.cache.clear();

    console.log('Locator cache cleared');
  }

  /**
   * Returns cache size.
   */
  static size(): number {
    return LocatorCache.cache.size;
  }
}
