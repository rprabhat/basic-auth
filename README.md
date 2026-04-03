# 🔐 Basic Auth

A simple and secure basic authentication implementation for Node.js/TypeScript applications.

[![TypeScript](https://img.shields.io/github/languages/top/rprabhat/basic-auth)]()
[![License](https://img.shields.io/github/license/rprabhat/basic-auth)](LICENSE)

## 📦 Installation

```bash
npm install basic-auth
# or
yarn add basic-auth
```

## 🚀 Usage

```typescript
import { basicAuth } from 'basic-auth';

// Express middleware
app.use(basicAuth({
  users: {
    admin: 'password123',
    user: 'securepass'
  },
  realm: 'My Protected Area'
}));
```

## 📋 Features

- Simple username/password authentication
- Configurable realm
- Express/Next.js middleware support
- TypeScript support

## 📄 License

MIT License

## 👤 Author

**Prabhat Ranjan**
- GitHub: [@rprabhat](https://github.com/rprabhat)
- LinkedIn: [prabhatr](https://www.linkedin.com/in/prabhatr/)
