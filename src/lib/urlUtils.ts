import type { HeartbeatState, ThemeId } from './types';

interface HeartbeatData {
    msg?: string;
    from?: string;
    to?: string;
    bpm?: number;
    theme?: string;
}

export function encodeHeartbeatData(data: Partial<HeartbeatState>): string {
    const minifiedData: HeartbeatData = {};
    if (data.message) minifiedData.msg = data.message;
    if (data.sender) minifiedData.from = data.sender;
    if (data.recipient) minifiedData.to = data.recipient;
    if (data.bpm) minifiedData.bpm = data.bpm;
    if (data.themeId) minifiedData.theme = data.themeId;

    try {
        return btoa(JSON.stringify(minifiedData));
    } catch (e) {
        console.error('Failed to encode data', e);
        return '';
    }
}

export function decodeHeartbeatData(hash: string): Partial<HeartbeatState> | null {
    try {
        // Remove leading # if present
        const cleanHash = hash.replace(/^#/, '');
        if (!cleanHash) return null;

        const decoded = atob(cleanHash);
        const data: HeartbeatData = JSON.parse(decoded);

        return {
            message: data.msg,
            sender: data.from,
            recipient: data.to,
            bpm: data.bpm,
            themeId: data.theme as ThemeId,
        };
    } catch (e) {
        console.warn('Failed to decode hash data', e);
        return null;
    }
}

export function getHeartbeatDataFromUrl(): Partial<HeartbeatState> | null {
    // 1. Try Hash (New Secure Method)
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        const data = decodeHeartbeatData(hash);
        if (data) return data;
    }

    // 2. Try Query Params (Backward Compatibility)
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg');
    const bpm = params.get('bpm');
    const theme = params.get('theme');
    const from = params.get('from');
    const to = params.get('to');

    if (msg || bpm || theme || from || to) {
        return {
            message: msg || undefined,
            bpm: bpm ? parseInt(bpm, 10) : undefined,
            themeId: (theme as ThemeId) || undefined,
            sender: from || undefined,
            recipient: to || undefined,
        };
    }

    return null;
}

export async function shortenUrl(longUrl: string): Promise<string> {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        if (response.ok) {
            return await response.text();
        }
    } catch (e) {
        console.warn('URL shortener failed, using long URL', e);
    }
    return longUrl;
}
