import { LocatorCache } from '../core/LocatorCache';
import { LocatorRepository } from '../repository/LocatorRepository';

export class SmartHealingService {
  constructor(private locatorRepository: LocatorRepository) {}

  async heal(elementName: string, pageName: string): Promise<string | null> {
    const cacheKey = `${pageName}_${elementName}`;

    // Step 1: Check Cache
    if (LocatorCache.has(cacheKey)) {
      console.log(`⚡ Cache Hit for ${elementName}`);

      return LocatorCache.get(cacheKey)!;
    }

    console.log(`📦 Cache Miss for ${elementName}`);

    // Step 2: Search Database
    const historicalLocator = await this.locatorRepository.findLocator(elementName, pageName);

    // Step 3: Store in Cache
    if (historicalLocator) {
      LocatorCache.put(cacheKey, historicalLocator);

      console.log(`✅ Healing candidate found: ${historicalLocator}`);

      return historicalLocator;
    }

    console.log(`❌ No historical locator available for ${elementName}`);

    return null;
  }
}
