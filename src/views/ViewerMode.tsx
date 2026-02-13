import { useEffect } from 'react';
import { HeartSVG } from '../components/heart/HeartSVG';
import { ParticleField } from '../components/background/ParticleField';
import type { HeartbeatState } from '../lib/types';
import { THEMES, DEFAULT_THEME } from '../lib/themes';
// We don't have react-router, we just use window location for 'create your own'

interface ViewerModeProps {
    state: HeartbeatState;
}

export function ViewerMode({ state }: ViewerModeProps) {
    const { message, bpm, themeId, sender, recipient } = state;
    const theme = THEMES[themeId] || DEFAULT_THEME;

    // Fade in effects
    useEffect(() => {
        // We can just use CSS animations on mount
    }, []);

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}
        >
            <ParticleField theme={theme} count={30} />

            <div className="z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in-slow">

                {/* Recipient Name */}
                {recipient && (
                    <div
                        className="mb-8 text-xl md:text-2xl font-light tracking-widest uppercase opacity-0 animate-fade-in-delayed-1"
                        style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                    >
                        For {recipient}
                    </div>
                )}

                {/* The Heart */}
                <div className="transform transition-transform duration-1000">
                    <HeartSVG bpm={bpm} theme={theme} className="w-64 h-64 md:w-96 md:h-96" />
                </div>

                {/* Message */}
                <div
                    className="mt-12 max-w-2xl opacity-0 animate-fade-in-up-delayed px-4"
                    style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
                >
                    <h1
                        className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight italic break-words"
                        style={{ textShadow: `0 0 20px ${theme.colors.glow}` }}
                    >
                        {message}
                    </h1>

                    {/* Sender Name */}
                    {sender && (
                        <p className="mt-8 text-base md:text-lg font-medium opacity-70 tracking-widest uppercase">
                            From {sender}
                        </p>
                    )}
                </div>

            </div>

            {/* Footer / Create your own */}
            <a
                href="/"
                className="absolute bottom-6 right-6 opacity-40 hover:opacity-100 transition-opacity text-xs uppercase tracking-widest flex items-center gap-2 z-20"
            >
                Create your own <span className="text-xl">♡</span>
            </a>

            <style>{`
        .animate-fade-in-slow {
          animation: fadeIn 2s ease-out forwards;
        }
        .animate-fade-in-delayed-1 {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-fade-in-up-delayed {
          animation: fadeInUp 1.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
