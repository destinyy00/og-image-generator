import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters with defaults
  const title = searchParams.get('title') || 'Your Title Here';
  const description = searchParams.get('description') || 'Add a description for your content';
  const bgColor = searchParams.get('bg') || '#0f172a';
  const textColor = searchParams.get('text') || '#ffffff';
  const accentColor = searchParams.get('accent') || '#3b82f6';
  const pattern = searchParams.get('pattern') || 'dots';
  const logo = searchParams.get('logo') || '';
  const author = searchParams.get('author') || '';
  const width = parseInt(searchParams.get('width') || '1200');
  const height = parseInt(searchParams.get('height') || '630');

  // Pattern SVGs
  const patterns: Record<string, string> = {
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(accentColor)}' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='${encodeURIComponent(accentColor)}' stroke-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='${encodeURIComponent(accentColor)}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    none: 'none',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          backgroundColor: bgColor,
          backgroundImage: patterns[pattern] || patterns.dots,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top section with optional logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              width={48}
              height={48}
              style={{ borderRadius: '8px' }}
            />
          )}
          {author && (
            <span
              style={{
                color: accentColor,
                fontSize: '24px',
                fontWeight: 600,
              }}
            >
              {author}
            </span>
          )}
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              color: textColor,
              fontSize: title.length > 40 ? '48px' : '64px',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: '90%',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                color: textColor,
                opacity: 0.8,
                fontSize: '28px',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '80%',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            display: 'flex',
            width: '120px',
            height: '6px',
            backgroundColor: accentColor,
            borderRadius: '3px',
          }}
        />
      </div>
    ),
    {
      width,
      height,
    }
  );
}
