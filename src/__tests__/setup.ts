// Mock console.log before all tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

// Restore console.log after all tests
afterAll(() => {
  jest.restoreAllMocks();
});
