import { LocatorModel } from '../models/LocatorModel';
import { LocatorRepository } from './LocatorRepository';

export class LocatorRepositoryService {
  static findByLocator(locator: string) {
    console.log('\n===========================');
    console.log('Repository Search Started');
    console.log('Searching for:', locator);

    console.log('\nRepository Contents:\n');

    LocatorRepository.forEach((x: LocatorModel) => {
      console.log('Element:', x.elementName);

      console.log('Primary:', x.primaryLocator);

      console.log('Fallbacks:', x.fallbackLocators);

      console.log('---------------------');
    });

    const result = LocatorRepository.find(
      (x: LocatorModel) => x.primaryLocator === locator || x.fallbackLocators.includes(locator),
    );

    console.log('\nSearch Result:\n', result);

    console.log('===========================\n');

    return result;
  }
}
