import { HeartSVG } from '../components/heart/HeartSVG';
import { ParticleField } from '../components/background/ParticleField';
import type { HeartbeatState } from '../lib/types';
import { THEMES, DEFAULT_THEME } from '../lib/themes';
import { Heart } from 'lucide-react';

interface ViewerModeProps {
    state: HeartbeatState;
}

export function ViewerMode({ state }: ViewerModeProps) {
    const { message, bpm, themeId, sender, recipient } = state;
    const theme = THEMES[themeId] || DEFAULT_THEME;

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 font-sans p-6"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}
        >
            <ParticleField theme={theme} count={40} />

            <div className="z-10 flex flex-col items-center justify-center text-center animate-fade-in-slow w-full max-w-4xl">

                {/* Recipient Name */}
                {recipient && (
                    <div
                        className="mb-12 text-sm md:text-base font-medium tracking-[0.2em] uppercase opacity-0 animate-fade-in-delayed-1"
                        style={{ animationDelay: '1s', animationFillMode: 'forwards', color: theme.colors.textSoft }}
                    >
                        For {recipient}
                    </div>
                )}

                {/* The Heart */}
                <div className="transform transition-transform duration-1000 mb-12">
                    <HeartSVG bpm={bpm} theme={theme} className="w-72 h-72 md:w-96 md:h-96 drop-shadow-2xl" />
                </div>

                {/* Message */}
                <div
                    className="max-w-3xl opacity-0 animate-fade-in-up-delayed px-4"
                    style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
                >
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-serif italic leading-tight break-words tracking-wide"
                        style={{ textShadow: `0 0 30px ${theme.colors.glow}` }}
                    >
                        {message}
                    </h1>

                    {/* Sender Name */}
                    {sender && (
                        <div className="mt-12 flex items-center justify-center gap-2 opacity-70">
                            <div className="h-px w-8 bg-current opacity-50"></div>
                            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase" style={{ color: theme.colors.textSoft }}>
                                With Love, {sender}
                            </p>
                            <div className="h-px w-8 bg-current opacity-50"></div>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer / Create your own */}
            <a
                href="/"
                className="absolute bottom-8 opacity-40 hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest flex items-center gap-2 z-20 hover:scale-105 transform duration-300"
                style={{ color: theme.colors.text }}
            >
                Create your own <Heart size={10} className="fill-current" />
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
