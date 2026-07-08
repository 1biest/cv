import { ImageResponse } from 'next/og';

export const alt = 'Logan Biesterfeldt — Design Engineer & Frontend Lead';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3357 55%, #061a2e 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -160,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(120,170,255,0.30) 0%, rgba(10,37,64,0) 70%)',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.06)',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#4ade80',
                display: 'flex',
              }}
            />
            Open to opportunities
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              display: 'flex',
            }}
          >
            Logan Biesterfeldt
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 44,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.92)',
              display: 'flex',
            }}
          >
            Design Engineer · Frontend Lead
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 28,
              color: 'rgba(255,255,255,0.62)',
              display: 'flex',
            }}
          >
            Figma to production · React · TypeScript · DeFi
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <span>Open to relocation · Remote-friendly</span>
          <span>github.com/1biest</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
