import { useState } from 'react';
import { HeartSVG } from '../components/heart/HeartSVG';
import { ParticleField } from '../components/background/ParticleField';
import type { HeartbeatState, ThemeId } from '../lib/types';
import { THEMES, DEFAULT_THEME } from '../lib/themes';
import { cn } from '../lib/utils';
import { Play, Link as LinkIcon, Check } from 'lucide-react';

interface CreateModeProps {
    initialState?: Partial<HeartbeatState>;
}

export function CreateMode({ initialState }: CreateModeProps) {
    const [message, setMessage] = useState(initialState?.message || 'I love you');
    const [sender, setSender] = useState(initialState?.sender || '');
    const [recipient, setRecipient] = useState(initialState?.recipient || '');
    const [bpm, setBpm] = useState(initialState?.bpm || 60);
    const [themeId, setThemeId] = useState<ThemeId>(initialState?.themeId || 'classic');
    const [copied, setCopied] = useState(false);

    const theme = THEMES[themeId] || DEFAULT_THEME;

    const [lastTap, setLastTap] = useState<number>(0);
    const [tapTimes, setTapTimes] = useState<number[]>([]);

    const handleTap = () => {
        const now = Date.now();
        if (now - lastTap > 2000) {
            setTapTimes([now]);
        } else {
            const newTapTimes = [...tapTimes, now];
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

    const generateLink = () => {
        const params = new URLSearchParams();
        if (message) params.set('msg', message);
        if (sender) params.set('from', sender);
        if (recipient) params.set('to', recipient);
        params.set('bpm', bpm.toString());
        params.set('theme', themeId);

        // Construct the full URL
        // In dev, it might be localhost, in prod it's the domain
        const url = `${window.location.origin}/?${params.toString()}`;
        return url;
    };

    const shareLink = async () => {
        const url = generateLink();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const openPreview = () => {
        window.open(generateLink(), '_blank');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-700"
            style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}
        >
            <ParticleField theme={theme} />

            <div className="z-10 w-full max-w-5xl animate-fade-in-up">

                <div className="text-center space-y-2 mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif italic" style={{ textShadow: `0 0 10px ${theme.colors.glow}` }}>
                        Heartbeat Visualizer
                    </h1>
                    <p className="text-sm opacity-80 font-light max-w-xs mx-auto md:max-w-none">Create a beating heart message for someone special.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center">

                    {/* Left Column: Preview Area */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-6 lg:py-0 min-h-[300px]">
                        <div className="text-sm font-medium mb-4 opacity-70 tracking-widest uppercase">
                            {recipient ? `For ${recipient}` : 'For [Name]'}
                        </div>

                        <HeartSVG bpm={bpm} theme={theme} className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 transition-all duration-500" />

                        <div className="mt-8 text-center space-y-2 w-full px-4">
                            <p className="text-xl md:text-2xl font-serif leading-relaxed break-words" style={{ color: theme.colors.text }}>
                                {message || 'Your message here'}
                            </p>
                            <p className="text-xs md:text-sm font-medium opacity-70 tracking-widest uppercase mt-4">
                                {sender ? `From ${sender}` : 'From [Name]'}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Controls */}
                    <div className="w-full lg:w-1/2 lg:max-w-md space-y-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-wider opacity-60">Message</label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="I love you..."
                                className="w-full bg-transparent border-b border-white/20 py-2 px-1 focus:outline-none focus:border-white/60 transition-colors text-lg font-serif"
                                maxLength={100}
                            />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    placeholder="To (optional)"
                                    className="w-full sm:w-1/2 bg-transparent border-b border-white/20 py-2 px-1 focus:outline-none focus:border-white/60 transition-colors text-sm"
                                />
                                <input
                                    type="text"
                                    value={sender}
                                    onChange={(e) => setSender(e.target.value)}
                                    placeholder="From (optional)"
                                    className="w-full sm:w-1/2 bg-transparent border-b border-white/20 py-2 px-1 focus:outline-none focus:border-white/60 transition-colors text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-wider opacity-60">Heartbeat ({bpm} BPM)</label>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <button
                                    onClick={handleTap}
                                    className="flex-1 py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-95 border border-white/10 flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    Tap Rhythm
                                </button>
                                <input
                                    type="range"
                                    min="40"
                                    max="180"
                                    value={bpm}
                                    onChange={(e) => setBpm(parseInt(e.target.value))}
                                    className="flex-1 accent-white/80 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="flex justify-between text-xs opacity-50 px-1">
                                <button onClick={() => setBpm(60)} className="hover:opacity-100 p-1">Calm</button>
                                <button onClick={() => setBpm(100)} className="hover:opacity-100 p-1">Excited</button>
                                <button onClick={() => setBpm(140)} className="hover:opacity-100 p-1">Racing</button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-wider opacity-60">Theme</label>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                                {Object.values(THEMES).map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setThemeId(t.id)}
                                        className={cn(
                                            "w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 border-2 transition-all snap-start",
                                            themeId === t.id ? "scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "border-transparent opacity-70 hover:opacity-100"
                                        )}
                                        style={{ backgroundColor: t.colors.heart }}
                                        title={t.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={openPreview}
                                className="w-full sm:w-auto flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium flex items-center justify-center gap-2 active:scale-95"
                            >
                                <Play size={18} /> Preview
                            </button>
                            <button
                                onClick={shareLink}
                                className={cn(
                                    "w-full sm:w-auto flex-[2] py-3.5 rounded-xl transition-all font-medium flex items-center justify-center gap-2 text-black shadow-lg active:scale-95",
                                    copied ? "bg-green-400" : "bg-white hover:bg-gray-100"
                                )}
                            >
                                {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                                {copied ? 'Copied Link!' : 'Create Link'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
