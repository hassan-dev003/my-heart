import { useMemo } from 'react';
import { cn } from '../../lib/utils';
import type { Theme } from '../../lib/types';

interface HeartSVGProps {
    bpm: number;
    theme: Theme;
    className?: string;
    isBeating?: boolean;
}

export function HeartSVG({ bpm, theme, className, isBeating = true }: HeartSVGProps) {
    const animationDuration = useMemo(() => {
        if (!isBeating || bpm <= 0) return '0s';
        return `${60 / bpm}s`;
    }, [bpm, isBeating]);

    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            style={{
                width: '300px',
                height: '300px',
            }}
        >
            {/* Glow effect behind the heart */}
            <div
                className={cn("absolute inset-0 rounded-full blur-3xl opacity-30")}
                style={{
                    backgroundColor: theme.colors.glow,
                    animation: isBeating ? `heartbeat ${animationDuration} infinite cubic-bezier(0.215, 0.61, 0.355, 1)` : 'none',
                    transformOrigin: 'center',
                }}
            />

            {/* The Heart SVG */}
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cn("w-full h-full drop-shadow-2xl")}
                style={{
                    color: theme.colors.heart,
                    filter: `drop-shadow(0 0 20px ${theme.colors.glow})`,
                    animation: isBeating ? `heartbeat ${animationDuration} infinite cubic-bezier(0.215, 0.61, 0.355, 1)` : 'none',
                    transformOrigin: 'center',
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>
    );
}
