# OG Image Generator

Generate beautiful social preview images for your content in seconds. Free, open source, and easy to use.

![OG Image Generator](https://og.buildera.dev/api/og?title=OG%20Image%20Generator&description=Generate%20beautiful%20social%20preview%20images&accent=%233b82f6)

## Features

- 🎨 **Customizable** - Colors, patterns, text, logos
- ⚡ **Fast** - Edge-rendered with @vercel/og
- 🎯 **Standard sizes** - 1200×630 (Twitter/Facebook optimized)
- 📋 **Copy & Download** - One-click URL copy or PNG download
- 🌙 **Dark UI** - Easy on the eyes
- 🆓 **Free & Open Source** - No sign-up required

## Usage

### Web Interface

Visit [og.buildera.dev](https://og.buildera.dev) and customize your image using the form.

### Direct API

Generate images programmatically:

```
https://og.buildera.dev/api/og?title=Your%20Title&description=Your%20description
```

#### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `title` | "Your Title Here" | Main heading |
| `description` | "Add a description..." | Subheading text |
| `bg` | `#0f172a` | Background color (hex) |
| `text` | `#ffffff` | Text color (hex) |
| `accent` | `#3b82f6` | Accent color (hex) |
| `pattern` | `dots` | Background pattern: `dots`, `grid`, `waves`, `none` |
| `author` | - | Author/brand name (top-left) |
| `logo` | - | Logo URL (top-left) |
| `width` | `1200` | Image width |
| `height` | `630` | Image height |

### In Your HTML

```html
<meta property="og:image" content="https://og.buildera.dev/api/og?title=My%20Post&description=Check%20this%20out" />
<meta name="twitter:image" content="https://og.buildera.dev/api/og?title=My%20Post&description=Check%20this%20out" />
```

## Self-Hosting

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Buildera-dev/og-image-generator.git
cd og-image-generator
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Buildera-dev/og-image-generator)

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [@vercel/og](https://vercel.com/docs/functions/og-image-generation) - OG image generation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Contributing

PRs welcome! Feel free to open issues for bugs or feature requests.

## License

MIT © [buildera.dev](https://buildera.dev)

---

Built by [@Buildera_dev](https://x.com/Buildera_dev)
