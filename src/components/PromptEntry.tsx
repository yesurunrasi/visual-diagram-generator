'use client';

import { useState } from 'react';
import { Send, Wand2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptEntryProps {
    onGenerate: (prompt: string) => void;
    isLoading?: boolean;
}

export default function PromptEntry({ onGenerate, isLoading }: PromptEntryProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <form
                onSubmit={handleSubmit}
                className="glass-dark rounded-2xl p-2 flex items-center gap-2 border border-white/10 shadow-2xl focus-within:border-blue-500/50 transition-all duration-300"
            >
                <div className="p-3 text-blue-400">
                    <Wand2 className="w-5 h-5 animate-pulse" />
                </div>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your UML or BPMN diagram... (e.g. System login flow with OTP)"
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm py-2"
                />
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50",
                        "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    )}
                >
                    {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <span className="hidden sm:inline">Generate</span>
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
            <div className="flex gap-2 mt-3 px-2 justify-center">
                {['UML Class', 'BPMN 2.0', 'Activity Diagram'].map((label) => (
                    <button
                        key={label}
                        className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                        onClick={() => setPrompt(`Generate ${label} for ...`)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
