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
                size: Math.random() * 4 + 2, // 2px to 6px
                duration: `${Math.random() * 12 + 8}s`, // 8s to 20s
                delay: `-${Math.random() * 20}s`, // Start immediately at random positions
                sway: `${Math.random() * 40 - 20}px`, // -20px to 20px horizontal sway
                opacity: Math.random() * 0.2 + 0.1, // 0.1 to 0.3 opacity
            });
        }
        setParticles(newParticles);
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full animate-float bottom-0"
                    style={{
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: theme.colors.glow,
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
