'use client';

import { useMemo, useState } from 'react';

const PATTERNS = ['dots', 'grid', 'waves', 'none'];
const PRESETS = [
  { name: 'Dark Blue', bg: '#0f172a', text: '#ffffff', accent: '#3b82f6' },
  { name: 'Dark Purple', bg: '#1e1b4b', text: '#ffffff', accent: '#a855f7' },
  { name: 'Dark Green', bg: '#022c22', text: '#ffffff', accent: '#10b981' },
  { name: 'Light', bg: '#ffffff', text: '#0f172a', accent: '#3b82f6' },
  { name: 'Warm', bg: '#1c1917', text: '#fafaf9', accent: '#f97316' },
  { name: 'Pink', bg: '#0f172a', text: '#ffffff', accent: '#ec4899' },
];

export default function Home() {
  const [title, setTitle] = useState('Build Beautiful OG Images');
  const [description, setDescription] = useState('Generate stunning social preview images for your content in seconds');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [pattern, setPattern] = useState('dots');
  const [author, setAuthor] = useState('');
  const [logo, setLogo] = useState('');
  const [copied, setCopied] = useState(false);

  const imageUrl = useMemo(() => {
    const params = new URLSearchParams({
      title,
      description,
      bg: bgColor,
      text: textColor,
      accent: accentColor,
      pattern,
      ...(author && { author }),
      ...(logo && { logo }),
    });
    return `/api/og?${params.toString()}`;
  }, [title, description, bgColor, textColor, accentColor, pattern, author, logo]);

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setAccentColor(preset.accent);
  };

  const copyUrl = () => {
    const fullUrl = `${window.location.origin}${imageUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'og-image.png';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold">
              OG
            </div>
            <div>
              <h1 className="text-lg font-bold sm:text-xl">OG Image Generator</h1>
              <p className="text-sm text-slate-400">by buildera.dev</p>
            </div>
          </div>
          <a
            href="https://github.com/Buildera_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-slate-400 transition hover:text-white sm:self-auto"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-semibold">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your title"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter a description"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">Author / Brand</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">Logo URL</label>
                    <input
                      type="text"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <h2 className="mb-4 text-lg font-semibold">Style</h2>

              {/* Presets */}
              <div className="mb-6">
                <label className="mb-3 block text-sm text-slate-400">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="rounded-lg px-3 py-2 text-sm font-medium transition hover:scale-105"
                      style={{
                        backgroundColor: preset.bg,
                        color: preset.text,
                        border: `2px solid ${preset.accent}`,
                      }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-12 cursor-pointer rounded bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Text</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-10 w-12 cursor-pointer rounded bg-transparent"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Accent</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-12 cursor-pointer rounded bg-transparent"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pattern */}
              <div>
                <label className="mb-3 block text-sm text-slate-400">Background Pattern</label>
                <div className="flex flex-wrap gap-2">
                  {PATTERNS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPattern(p)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                        pattern === p ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Preview</h2>
                <span className="text-sm text-slate-400">1200 x 630</span>
              </div>
              <div className="aspect-[1200/630] overflow-hidden rounded-lg border border-slate-700">
                {imageUrl && <img src={imageUrl} alt="OG Image Preview" className="h-full w-full object-cover" />}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={copyUrl}
                className="flex-1 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                onClick={downloadImage}
                className="flex-1 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600"
              >
                Download PNG
              </button>
            </div>

            {/* Usage */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <h2 className="mb-3 text-lg font-semibold">Usage</h2>
              <p className="mb-3 text-sm text-slate-400">Add this to your HTML head:</p>
              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs sm:text-sm">
                <code className="text-green-400">
{`<meta property="og:image" content="${typeof window !== 'undefined' ? window.location.origin : ''}${imageUrl}" />
<meta name="twitter:image" content="${typeof window !== 'undefined' ? window.location.origin : ''}${imageUrl}" />`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-400">
          Built with Next.js and @vercel/og | Open source on GitHub
        </div>
      </footer>
    </main>
  );
}
