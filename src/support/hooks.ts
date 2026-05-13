import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { ConfigManager } from '../config/ConfigManager';
import { Browsers } from './enums/Browsers'; // Ensure this is imported
import { BrowserType, LaunchOptions } from '@playwright/test';

export let pageFixture: {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

Before(async () => {
  const browserName = ConfigManager.getBrowser();

  // Define the types clearly for TypeScript
  const browserMap: Record<string, BrowserType> = {
    [Browsers.CHROMIUM]: chromium,
    [Browsers.FIREFOX]: firefox,
    [Browsers.WEBKIT]: webkit,
    [Browsers.MSEDGE]: chromium, // Edge uses chromium engine
  };

  const browserType = browserMap[browserName] || chromium; // Default to chromium if undefined

  // Pass the channel if using msedge
  const launchOptions: LaunchOptions = {
    headless: ConfigManager.isHeadless(),
  };

  if (browserName === Browsers.MSEDGE) {
    launchOptions.channel = 'msedge';
  }

  const browser = await browserType.launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();

  pageFixture = { browser, context, page };
});
