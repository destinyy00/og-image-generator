'use client';

import { useState, useEffect } from 'react';

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
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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
    setImageUrl(`/api/og?${params.toString()}`);
  }, [title, description, bgColor, textColor, accentColor, pattern, author, logo]);

  const applyPreset = (preset: typeof PRESETS[0]) => {
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
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
              OG
            </div>
            <div>
              <h1 className="font-bold text-xl">OG Image Generator</h1>
              <p className="text-slate-400 text-sm">by buildera.dev</p>
            </div>
          </div>
          <a
            href="https://github.com/Buildera_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h2 className="font-semibold text-lg mb-4">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter a description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Author / Brand</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Logo URL</label>
                    <input
                      type="text"
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h2 className="font-semibold text-lg mb-4">Style</h2>
              
              {/* Presets */}
              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-3">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition hover:scale-105"
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
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Text</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Accent</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pattern */}
              <div>
                <label className="block text-sm text-slate-400 mb-3">Background Pattern</label>
                <div className="flex gap-2">
                  {PATTERNS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPattern(p)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                        pattern === p
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Preview</h2>
                <span className="text-sm text-slate-400">1200 × 630</span>
              </div>
              <div className="aspect-[1200/630] rounded-lg overflow-hidden border border-slate-700">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="OG Image Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={copyUrl}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition"
              >
                {copied ? '✓ Copied!' : 'Copy URL'}
              </button>
              <button
                onClick={downloadImage}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition"
              >
                Download PNG
              </button>
            </div>

            {/* Usage */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h2 className="font-semibold text-lg mb-3">Usage</h2>
              <p className="text-sm text-slate-400 mb-3">Add this to your HTML head:</p>
              <pre className="bg-slate-950 rounded-lg p-4 text-sm overflow-x-auto">
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
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          Built with Next.js and @vercel/og • Open source on GitHub
        </div>
      </footer>
    </main>
  );
}
