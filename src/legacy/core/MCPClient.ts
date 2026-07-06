// commented old code used  for local readonly

// export class MCPClient {
//   async healLocator(locator: string): Promise<string> {
//     FrameworkLogger.log(`📡 Sending locator to MCP Server: ${locator}`);

//     // Demo healing logic
//     if (locator === "[data-test='login-button-old']") {
//       FrameworkLogger.log('🤖 MCP Server identified a matching locator');

//       FrameworkLogger.log(
//         '🔄 Healing locator from ' +
//           "[data-test='login-button-old'] " +
//           "to [data-test='login-button']",
//       );

//       return "[data-test='login-button']";
//     }

//     FrameworkLogger.log('⚠️ No healed locator found. Returning original locator.');

//     return locator;
//   }
// }

import { LocatorRepositoryService } from '../repository/LocatorRepositoryService';

export class MCPClient {
  async healLocator(locator: string): Promise<string> {
    console.log(`📡 Sending locator to MCP Server: ${locator}`);

    const locatorInfo = LocatorRepositoryService.findByLocator(locator);

    if (locatorInfo) {
      console.log(`✨ Healed locator found: ${locatorInfo.primaryLocator}`);

      return locatorInfo.primaryLocator;
    }

    throw new Error(`Unable to heal locator: ${locator}`);
  }
}
