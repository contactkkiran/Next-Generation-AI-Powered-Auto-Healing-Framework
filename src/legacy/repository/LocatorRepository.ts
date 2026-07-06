// Enterprise Locator Repository

import { LocatorModel } from '../models/LocatorModel';

export const LocatorRepository: LocatorModel[] = [
  // Login Button
  {
    elementName: 'LoginButton',

    pageName: 'LoginPage',

    primaryLocator: "[data-test='login-button']",

    fallbackLocators: [
      // Old locator used in test
      "[data-test='login-button-old']",

      // Other possible locators
      '#login-button',

      "input[type='submit']",

      'text=Login',
    ],

    confidence: 100,

    lastUpdated: new Date(),
  },

  // Username Field
  {
    elementName: 'Username',

    pageName: 'LoginPage',

    primaryLocator: "[data-test='username']",

    fallbackLocators: ["[data-test='username-old']", '#user-name', "input[name='user-name']"],

    confidence: 100,

    lastUpdated: new Date(),
  },

  // Password Field
  {
    elementName: 'Password',

    pageName: 'LoginPage',

    primaryLocator: "[data-test='password']",

    fallbackLocators: ["[data-test='password-old']", '#password', "input[name='password']"],

    confidence: 100,

    lastUpdated: new Date(),
  },
];
