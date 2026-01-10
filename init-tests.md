- Configure project to use vitest with react testing library
- Add a test directory
  - Create `test-provider.tsx` which will be a reusable provider for our tests
  - Create a `mocks` directory
  - Create test fixtures for each type using @faker-js/faker

  EG:

  ```tsx
  function screenshot(overrides?: Partial<Screenshot> = {}) {
    return {
      data: faker.string.alphanumeric(100), // base64-encoded image
      width: faker.number.int({ min: 100, max: 1920 }),
      height: faker.number.int({ min: 100, max: 1080 }),
      ...overrides,
    };
  }
  ```

  - Export all mocks from `test/mocks/index`
  - Export all test (including mocks) from `test/index`
  - Tests all services
  - When adding tests the structure should look like

```
| [filename] # directory
| - index.ts
| - [filename].ts/x
| - [filename].test.ts/x
```

- Combine all queries under a single file `lib/queries`
- Combine all mutations under a single file `lib/mutations`
- Move all non-react query hooks to `lib/hooks`
- industries can move to `lib/constants`
- test all libs
- test all state
- I'll test components
