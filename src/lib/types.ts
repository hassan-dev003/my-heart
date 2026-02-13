export type ThemeId = 'rose' | 'blush' | 'burgundy' | 'garden' | 'golden';

export interface Theme {
    id: ThemeId;
    name: string;
    colors: {
        heart: string;
        heartLight: string;
        glow: string;
        glowStrong: string;
        accent: string;
        bg: string;
        bgDeep: string;
        text: string;
        textSoft: string;
        cardBg: string;
        particleColor: string;
    };
}

export interface HeartbeatState {
    message: string;
    bpm: number;
    themeId: ThemeId;
    sender: string;
    recipient: string;
}
