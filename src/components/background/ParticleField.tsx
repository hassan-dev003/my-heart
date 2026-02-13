import { useEffect, useState } from 'react';
import type { Theme } from '../../lib/types';

interface Particle {
    id: number;
    left: string;
    size: number;
    duration: string;
    delay: string;
    sway: string;
    opacity: number;
}

interface ParticleFieldProps {
    theme: Theme;
    count?: number;
}

export function ParticleField({ theme, count = 20 }: ParticleFieldProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            newParticles.push({
                id: i,
                left: `${Math.random() * 100}%`,
                size: Math.random() * 6 + 4, // 4px to 10px (increased size)
                duration: `${Math.random() * 12 + 8}s`, // 8s to 20s
                delay: `-${Math.random() * 20}s`, // Start immediately at random positions
                sway: `${Math.random() * 40 - 20}px`, // -20px to 20px horizontal sway
                opacity: Math.random() * 0.3 + 0.15, // 0.15 to 0.45 opacity with solid color
            });
        }
        setParticles(newParticles);
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full animate-float bottom-0"
                    style={{
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: theme.colors.heart, // Use solid color for better visibility control
                        opacity: 0, // Initial opacity handled by keyframe, but validation sets max
                        "--max-opacity": p.opacity,
                        "--sway": p.sway,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
