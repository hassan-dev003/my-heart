import type { Theme, ThemeId } from './types';

export const THEMES: Record<ThemeId, Theme> = {
    classic: {
        id: 'classic',
        name: 'Classic Red',
        colors: {
            heart: '#e63946',
            glow: '#ff1744',
            bg: '#0d1117',
            text: '#ffeef0',
        },
    },
    rose: {
        id: 'rose',
        name: 'Rose Gold',
        colors: {
            heart: '#f4a0b5',
            glow: '#ffb6c1',
            bg: '#1a1218',
            text: '#fde8ef',
        },
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight Blue',
        colors: {
            heart: '#4895ef',
            glow: '#00b4d8',
            bg: '#0a0e1a',
            text: '#e0f0ff',
        },
    },
    sunset: {
        id: 'sunset',
        name: 'Sunset Glow',
        colors: {
            heart: '#ff6b35',
            glow: '#ff8c61',
            bg: '#1a100d',
            text: '#fff0e8',
        },
    },
    lavender: {
        id: 'lavender',
        name: 'Lavender Dream',
        colors: {
            heart: '#b185db',
            glow: '#d4a5ff',
            bg: '#140f1a',
            text: '#f0e6ff',
        },
    },
};

export const DEFAULT_THEME = THEMES.classic;
