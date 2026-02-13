export type ThemeId = 'classic' | 'rose' | 'midnight' | 'sunset' | 'lavender';

export interface Theme {
    id: ThemeId;
    name: string;
    colors: {
        heart: string;
        glow: string;
        bg: string;
        text: string;
    };
}

export interface HeartbeatState {
    message: string;
    bpm: number;
    themeId: ThemeId;
    sender: string;
    recipient: string;
}
