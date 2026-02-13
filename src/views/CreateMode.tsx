import { useState } from 'react';
import { HeartSVG } from '../components/heart/HeartSVG';
import { ParticleField } from '../components/background/ParticleField';
import type { HeartbeatState, ThemeId } from '../lib/types';
import { THEMES, DEFAULT_THEME } from '../lib/themes';
import { cn } from '../lib/utils';
import { encodeHeartbeatData } from '../lib/urlUtils';
import { Play, Check, Heart } from 'lucide-react';

interface CreateModeProps {
    initialState?: Partial<HeartbeatState>;
}

const PRESETS = [
    { label: "Resting", sublabel: "thinking of you", bpm: 65 },
    { label: "Warm", sublabel: "when I see you", bpm: 85 },
    { label: "Flutter", sublabel: "when you smile", bpm: 110 },
    { label: "Racing", sublabel: "you take my breath away", bpm: 140 },
];

export function CreateMode({ initialState }: CreateModeProps) {
    const [message, setMessage] = useState(initialState?.message || '');
    const [sender, setSender] = useState(initialState?.sender || '');
    const [recipient, setRecipient] = useState(initialState?.recipient || '');
    const [bpm, setBpm] = useState(initialState?.bpm || 65);
    const [themeId, setThemeId] = useState<ThemeId>(initialState?.themeId || 'rose');
    const [copied, setCopied] = useState(false);

    const theme = THEMES[themeId] || DEFAULT_THEME;

    // Tap Rhythm Logic
    const [lastTap, setLastTap] = useState<number>(0);
    const [tapTimes, setTapTimes] = useState<number[]>([]);

    const handleTap = () => {
        const now = Date.now();
        if (now - lastTap > 2000) {
            setTapTimes([now]);
        } else {
            const newTapTimes = [...tapTimes, now].slice(-8); // Keep only the last 8 taps
            setTapTimes(newTapTimes);
            if (newTapTimes.length > 1) {
                const intervals = [];
                for (let i = 1; i < newTapTimes.length; i++) {
                    intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
                }
                const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                const newBpm = Math.round(60000 / avgInterval);
                if (newBpm >= 30 && newBpm <= 200) {
                    setBpm(newBpm);
                }
            }
        }
        setLastTap(now);
    };

    const generateEncodedLink = () => {
        const encoded = encodeHeartbeatData({
            message,
            sender,
            recipient,
            bpm,
            themeId,
        });
        return `${window.location.origin}/#${encoded}`;
    };

    const shareLink = async () => {
        const url = generateEncodedLink();

        // Copy immediately (synchronous — Safari-safe)
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.warn('Clipboard API failed, using fallback', err);
            // Fallback for older browsers / strict Safari contexts
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (e) {
                console.error('Fallback copy failed', e);
            }
            document.body.removeChild(textarea);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const openPreview = () => {
        window.open(generateEncodedLink(), '_blank');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-1000 font-sans overflow-hidden"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}
        >
            <div className="absolute inset-0 pointer-events-none z-0">
                <ParticleField theme={theme} count={25} />
            </div>

            <div className="z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 relative">

                {/* Left Side: Visual Preview (Desktop Only) */}
                <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-center text-center lg:items-center">
                    <div className="space-y-3 mb-12 text-center w-full flex flex-col items-center">
                        <h1 className="text-5xl md:text-6xl font-serif italic tracking-wide" style={{ color: theme.colors.text }}>
                            My Heartbeat
                        </h1>
                        <p className="text-lg font-light italic" style={{ color: theme.colors.textSoft }}>
                            Send your heartbeat to someone you love
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center w-full">
                        {/* Wrapper for For [Name] */}
                        {recipient && (
                            <div className="mb-8 text-sm font-medium tracking-[0.2em] uppercase animate-fade-in" style={{ color: theme.colors.textSoft }}>
                                TO {recipient}
                            </div>
                        )}

                        {/* Heart container */}
                        <div className="relative transform transition-all duration-500 hover:scale-105 mb-10">
                            <HeartSVG bpm={bpm} theme={theme} className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl" />
                        </div>

                        {/* Message */}
                        {message && (
                            <div className="text-center space-y-4 max-w-md px-4 animate-fade-in">
                                <p className="text-3xl md:text-4xl font-serif italic leading-tight" style={{ color: theme.colors.text }}>
                                    {message}
                                </p>
                            </div>
                        )}

                        {sender && (
                            <p className="mt-4 text-xs font-bold tracking-[0.2em] uppercase animate-fade-in" style={{ color: theme.colors.textSoft }}>
                                — WITH LOVE, {sender}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Side: Control Card (Mobile: Header + Controls) */}
                <div className="w-full lg:w-[480px] flex flex-col gap-6">

                    {/* Mobile Header & Preview */}
                    <div className="lg:hidden flex flex-col items-center text-center space-y-4 mb-2">
                        <h1 className="text-4xl font-serif italic tracking-wide" style={{ color: theme.colors.text }}>
                            My Heartbeat
                        </h1>
                        <p className="text-lg font-light italic" style={{ color: theme.colors.textSoft }}>
                            Send your heartbeat to someone you love
                        </p>
                        {recipient && (
                            <div className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: theme.colors.textSoft }}>
                                TO {recipient}
                            </div>
                        )}
                        <div className="relative transform transition-all duration-500 my-2">
                            <HeartSVG bpm={bpm} theme={theme} className="w-32 h-32 drop-shadow-xl" />
                        </div>
                        {message && (
                            <p className="text-xl font-serif italic leading-tight px-4" style={{ color: theme.colors.text }}>
                                {message}
                            </p>
                        )}
                        {sender && (
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: theme.colors.textSoft }}>
                                — {sender}
                            </p>
                        )}
                    </div>

                    <div className="w-full rounded-[2rem] p-6 md:p-10 shadow-2xl border border-white/40 backdrop-blur-md transition-colors duration-700"
                        style={{ backgroundColor: theme.colors.cardBg }}
                    >

                        {/* Message section */}
                        <div className="space-y-8 mb-10">
                            <div className="space-y-4">
                                <label className="block text-xs font-bold tracking-[0.2em] uppercase opacity-60">Your Message</label>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="I love you 3000.."
                                    className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-2xl font-serif placeholder:opacity-40 focus:outline-none transition-colors"
                                    maxLength={80}
                                    style={{ color: theme.colors.text, borderColor: theme.colors.accent }}
                                />
                            </div>

                            <div className="flex gap-4 md:gap-8">
                                <div className="flex-1 space-y-4">
                                    <label className="block text-xs font-bold tracking-[0.2em] uppercase opacity-60">To</label>
                                    <input
                                        type="text"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder="My love"
                                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-lg font-serif placeholder:opacity-40 focus:outline-none transition-colors"
                                        style={{ color: theme.colors.text, borderColor: theme.colors.accent }}
                                    />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <label className="block text-xs font-bold tracking-[0.2em] uppercase opacity-60">From</label>
                                    <input
                                        type="text"
                                        value={sender}
                                        onChange={(e) => setSender(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 py-2 text-lg font-serif placeholder:opacity-40 focus:outline-none transition-colors"
                                        style={{ color: theme.colors.text, borderColor: theme.colors.accent }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rhythm Control */}
                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-baseline">
                                <label className="block text-xs font-bold tracking-[0.2em] uppercase opacity-60">Heartbeat <span className="text-[10px] opacity-70 font-serif italic normal-case ml-1">{bpm} BPM</span></label>
                            </div>

                            <button
                                onClick={handleTap}
                                className="w-full py-3.5 rounded-xl border transition-all group flex items-center justify-center gap-3 hover:bg-white/50 active:scale-[0.98]"
                                style={{ borderColor: theme.colors.heart, color: theme.colors.heart }}
                            >
                                <Heart size={18} className={cn("transition-transform fill-transparent", tapTimes.length > 0 && "animate-ping")} />
                                <span className="font-serif text-lg">Tap Your Rhythm</span>
                            </button>

                            <div className="grid grid-cols-4 gap-2">
                                {PRESETS.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => setBpm(preset.bpm)}
                                        className={cn(
                                            "py-3 px-1 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 h-20 active:scale-95",
                                            bpm === preset.bpm
                                                ? "text-white shadow-md transform scale-105"
                                                : "bg-white/40 border-red-200 hover:bg-white/80 text-gray-600"
                                        )}
                                        style={bpm === preset.bpm ? { backgroundColor: theme.colors.heart, borderColor: theme.colors.heart } : {}}
                                    >
                                        <span className={cn("text-[0.65rem] font-bold uppercase tracking-wider")}>{preset.label}</span>
                                        <span className={cn("text-[0.5rem] leading-tight text-center italic font-serif px-1", bpm === preset.bpm ? "opacity-90" : "opacity-60")}>{preset.sublabel}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Theme Selection */}
                        <div className="space-y-4 mb-10">
                            <label className="block text-xs font-bold tracking-[0.2em] uppercase opacity-60">Theme</label>
                            <div className="flex gap-4">
                                {Object.values(THEMES).map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setThemeId(t.id)}
                                        className={cn(
                                            "w-12 h-12 rounded-full transition-all relative flex items-center justify-center",
                                            themeId === t.id ? "scale-110 shadow-lg ring-2 ring-offset-2 ring-[#d4a574]" : "hover:scale-105 hover:opacity-80"
                                        )}
                                        style={{
                                            background: `linear-gradient(135deg, ${t.colors.heart}, ${t.colors.heartLight})`
                                        }}
                                        title={t.name}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={openPreview}
                                className="py-4 rounded-xl border text-[#d4a574] border-[#d4a574] font-serif italic text-lg flex items-center justify-center gap-2 hover:bg-[#d4a574]/10 transition-all active:scale-95"
                            >
                                <Play size={16} className="fill-current" /> Preview
                            </button>
                            <button
                                onClick={shareLink}
                                className="py-4 rounded-xl font-medium text-white shadow-lg transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.colors.heart}, ${theme.colors.heartLight})`
                                }}
                            >
                                {copied ? <Check size={18} /> : <Heart size={18} className="fill-current" />}
                                <span className="font-serif italic text-lg">
                                    {copied ? 'Link Copied' : 'Create Link'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
