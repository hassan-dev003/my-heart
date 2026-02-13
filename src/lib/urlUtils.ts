import type { HeartbeatState, ThemeId } from './types';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

interface HeartbeatData {
    msg?: string;
    from?: string;
    to?: string;
    bpm?: number;
    theme?: string;
}

// Short keys interface for compression
interface CompressedData {
    m?: string; // message
    s?: string; // sender
    r?: string; // recipient
    b?: number; // bpm
    t?: string; // themeId
}

export function encodeHeartbeatData(data: Partial<HeartbeatState>): string {
    const compact: CompressedData = {};
    if (data.message) compact.m = data.message;
    if (data.sender) compact.s = data.sender;
    if (data.recipient) compact.r = data.recipient;
    if (data.bpm) compact.b = data.bpm;
    if (data.themeId) compact.t = data.themeId;

    try {
        return compressToEncodedURIComponent(JSON.stringify(compact));
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

        // 1. Try lz-string decompression (New Format)
        try {
            const decompressed = decompressFromEncodedURIComponent(cleanHash);
            if (decompressed) {
                const data: CompressedData = JSON.parse(decompressed);
                return {
                    message: data.m,
                    sender: data.s,
                    recipient: data.r,
                    bpm: data.b,
                    themeId: data.t as ThemeId,
                };
            }
        } catch (e) {
            // Not lz-string or failed to parse, fall through to legacy
        }

        // 2. Fallback: Legacy Base64 Format
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
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        return decodeHeartbeatData(hash);
    }
    return null;
}
