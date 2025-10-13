# Contributing to FHEVM SDK

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the FHEVM SDK project.

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm 9+
- Git
- MetaMask (for testing)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/fhevm-react-template.git
   cd fhevm-react-template
   ```
3. Install dependencies:
   ```bash
   npm install
   npm run install:all
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Building the SDK

```bash
npm run build:sdk
```

### Running Tests

```bash
npm test
```

### Running Examples

```bash
# Next.js example
npm run dev:nextjs

# Research platform example
npm run dev:research
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
fhevm-react-template/
├── packages/fhevm-sdk/    # Main SDK package
│   ├── src/
│   │   ├── core/          # Core functionality
│   │   ├── react/         # React hooks
│   │   └── utils/         # Utilities
│   └── README.md
├── examples/              # Example applications
│   ├── nextjs/           # Next.js example
│   └── research-data-sharing/
└── README.md
```

## Making Changes

### Adding New Features

1. Create a new branch for your feature
2. Implement the feature in the appropriate module:
   - Core functionality → `packages/fhevm-sdk/src/core/`
   - React hooks → `packages/fhevm-sdk/src/react/`
   - Utilities → `packages/fhevm-sdk/src/utils/`
3. Add tests for your feature
4. Update documentation
5. Build and test locally
6. Submit a pull request

### Bug Fixes

1. Create a branch named `fix/bug-description`
2. Fix the bug
3. Add regression tests
4. Submit a pull request with:
   - Description of the bug
   - How to reproduce
   - Your fix
   - Tests added

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments to all public APIs
- Update examples if behavior changes
- Include TypeScript types

## Code Standards

### TypeScript

- Use strict TypeScript
- Export all public types
- Add JSDoc comments to public APIs
- Use meaningful variable names

Example:
```typescript
/**
 * Encrypt a value for FHEVM contract
 *
 * @param client - FHEVM client
 * @param params - Encryption parameters
 * @returns Encrypted data object
 */
export async function encryptValue(
  client: FhevmClient,
  params: EncryptionParams
): Promise<EncryptedData> {
  // Implementation
}
```

### React

- Use functional components
- Use hooks for state management
- Follow React best practices
- Add prop types/interfaces

### Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

Example:
```
feat: add batch encryption support

- Implement encryptBatch function
- Add tests for batch operations
- Update documentation
```

## Testing

### Unit Tests

Add tests for all new functionality:

```typescript
describe('encryptValue', () => {
  it('should encrypt euint32 values', async () => {
    const result = await encryptValue(client, {
      value: 42,
      type: 'euint32'
    });
    expect(result.type).toBe('euint32');
  });
});
```

### Integration Tests

Test examples to ensure they work:

```bash
# Test Next.js build
cd examples/nextjs
npm run build

# Test research platform
cd examples/research-data-sharing
npm run build
```

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Submit PR with clear description
6. Link related issues
7. Wait for review

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guide
- [ ] All tests pass
- [ ] No breaking changes (or documented)
```

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

Thank you for contributing! 🚀
