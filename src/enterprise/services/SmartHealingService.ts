import { LocatorCache } from '../core/LocatorCache';
import { LocatorRepository } from '../repository/LocatorRepository';

/**
 * Handles locator healing workflow.
 *
 * Healing priority:
 * - In-memory cache
 * - Historical locator repository
 */
export class SmartHealingService {
  constructor(private locatorRepository: LocatorRepository) {}

  /**
   * Finds the best available locator for recovery.
   */
  async heal(elementName: string, pageName: string): Promise<string | null> {
    const cacheKey = this.generateCacheKey(pageName, elementName);

    const cachedLocator = this.findLocatorFromCache(cacheKey, elementName);

    if (cachedLocator) {
      return cachedLocator;
    }

    const historicalLocator = await this.findHistoricalLocator(elementName, pageName);

    if (!historicalLocator) {
      return null;
    }

    LocatorCache.put(cacheKey, historicalLocator);

    return historicalLocator;
  }

  /**
   * Retrieves locator from cache.
   */
  private findLocatorFromCache(cacheKey: string, elementName: string): string | undefined {
    const locator = LocatorCache.get(cacheKey);

    if (locator) {
      console.log(`Cache hit for locator: ${elementName}`);

      return locator;
    }

    console.log(`Cache miss for locator: ${elementName}`);

    return undefined;
  }

  /**
   * Retrieves locator from historical storage.
   */
  private async findHistoricalLocator(
    elementName: string,
    pageName: string,
  ): Promise<string | null> {
    const locator = await this.locatorRepository.findLocator(elementName, pageName);

    if (!locator) {
      console.log(`No historical locator available for: ${elementName}`);

      return null;
    }

    console.log(`Healing candidate found: ${locator}`);

    return locator;
  }

  /**
   * Generates unique cache key for locator lookup.
   */
  private generateCacheKey(pageName: string, elementName: string): string {
    return `${pageName}_${elementName}`;
  }
}
