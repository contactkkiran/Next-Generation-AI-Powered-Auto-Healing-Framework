# Next Generation AI Powered Auto Healing Framework

This repository demonstrates a lightweight Playwright-based automation setup that combines:

- resilient locator handling
- retry logic for transient failures
- dynamic visibility waiting
- quarantine support for flaky tests
- a simple demo MCP-style healing flow

The sample test uses SauceDemo to show how the framework can recover from a broken selector during a real checkout flow.

---

## What this project does

The framework is designed to reduce brittleness caused by:

- changing UI selectors
- slow or delayed rendering
- intermittent network issues
- unstable test environments

The main idea is to keep the test logic readable while adding safety checks around element lookup and action execution.

---

## Core components

- `ActionEngine`
  - wraps common actions such as `click` and `type`
  - uses the healer before interacting with elements

- `AutoHealingEngine`
  - checks whether a locator exists
  - triggers the healing flow when needed
  - stores a summary of healed locators

- `DynamicWaitEngine`
  - waits for an element to become visible before use

- `RetryEngine`
  - retries an action up to three times
  - captures screenshots when a retry fails

- `MCPClient`
  - contains the demo locator-healing mapping
  - currently maps a broken login selector to the corrected one

- `FrameworkLogger`
  - records execution messages for debugging and report attachments

- `FlakyQuarantineManager`
  - marks failed tests so they can be skipped temporarily if needed

---

## Project structure

```text
.
├── playwright.config.ts
├── README.md
└── src
    ├── core
    │   ├── ActionEngine.ts
    │   ├── AutoHealingEngine.ts
    │   ├── DynamicWaitEngine.ts
    │   ├── MCPClient.ts
    │   └── RetryEngine.ts
    ├── mcp
    │   └── server
    │       └── server.ts
    ├── tests
    │   └── ordersworkflow.spec.ts
    └── utils
        ├── FlakyQuarantineManager.ts
        └── FrameworkLogger.ts
```

---

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- a browser available for Playwright

---

## Setup

If the repository does not yet contain a package file, initialize one first:

```bash
npm init -y
```

Then install dependencies:

```bash
npm install
npm install -D @playwright/test
npx playwright install
```

The config file already includes the basic Playwright settings for the repo.

---

## Playwright configuration

The test runner settings in [playwright.config.ts](playwright.config.ts) include:

- test folder: `src/tests`
- parallel execution enabled
- screenshots, videos, and traces enabled
- Chromium configured as the default project
- headless mode turned off in the current config

---

## Running the tests

Run the full suite:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run a specific spec:

```bash
npx playwright test src/tests/ordersworkflow.spec.ts
```

---

## Example workflow

The sample scenario in [src/tests/ordersworkflow.spec.ts](src/tests/ordersworkflow.spec.ts) covers:

1. navigating to SauceDemo
2. logging in with valid credentials
3. attempting a broken login selector to demonstrate healing
4. adding a product to the cart
5. opening the cart
6. completing checkout
7. validating the final success message

---

## How the healing flow works

A simplified flow looks like this:

1. the test asks the framework to interact with a locator
2. `ActionEngine` delegates the lookup to `AutoHealingEngine`
3. `AutoHealingEngine` checks whether the locator exists
4. if the locator is missing, `MCPClient` attempts a repair suggestion
5. the action is retried if needed
6. logs and screenshots are attached to the report for traceability

---

## Running the demo MCP server

The file [src/mcp/server/server.ts](src/mcp/server/server.ts) is a minimal demo server stub. It prints startup messages and keeps the process alive.

You can run it with:

```bash
node src/mcp/server/server.ts
```

---

## Troubleshooting

If a run fails unexpectedly:

- verify the app is reachable
- ensure the browser is installed correctly
- review generated screenshots and traces
- inspect the attached logs from `FrameworkLogger`
- check whether the locator healing logic returned an unexpected selector

---

## Notes

This repo is best viewed as a proof-of-concept framework for experimenting with resilient UI automation. It provides a good starting point for adding stronger reporting, better selector strategies, and more realistic MCP integrations later.
