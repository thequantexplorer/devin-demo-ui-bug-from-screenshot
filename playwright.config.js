const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  reporter: 'list',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4173' },
  webServer: { command: 'node server.js', url: 'http://localhost:4173', reuseExistingServer: true },
});
