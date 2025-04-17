# Contributing to ESCPOS-JavaScript

Thank you for your interest in contributing to ESCPOS-JavaScript! This document provides guidelines and instructions for contributing to this project.

## Code Structure

The library follows a component-based architecture:

- `lib/` - Main source code directory
  - `index.js` - Main entry point with all exports
  - `POS*.js` - Component classes for various printer elements
  - `utils/` - Utility functions and constants

## Code Style

- Use modern ES Module syntax
- Follow JSDoc documentation standards
- Use meaningful variable and function names
- Write unit tests for all new features

## Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Run tests with `npm test`

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write code and tests
4. Run all tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Create a Pull Request

## Testing

All new features should include unit tests. Run tests with:

```bash
npm test
```

For test coverage, run:

```bash
npm run test:coverage
```

## Documentation

Use JSDoc comments for all classes, methods, and functions. Example:

```js
/**
 * Adds a component to the document
 * @param {POSComponent} component - Component to add
 * @returns {POSDocument} This document for chaining
 * @throws {Error} If the component is not a POSComponent instance
 */
addComponent(component) {
  // Implementation
}
```

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Questions

If you have any questions about contributing, please open an issue on GitHub. 