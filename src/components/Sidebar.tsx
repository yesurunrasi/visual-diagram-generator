'use client';

import { useState } from 'react';
import {
    Database,
    Share2,
    Download,
    Settings,
    ChevronRight,
    Layers,
    Zap,
    History,
    Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { icon: Zap, label: 'Auto Generate', active: true },
        { icon: Layers, label: 'Elements', active: false },
        { icon: History, label: 'Recent', active: false },
        { icon: Database, label: 'Templates', active: false },
    ];

    return (
        <aside className={cn(
            "h-screen glass-dark border-r border-white/5 transition-all duration-300 flex flex-col items-center py-6",
            isOpen ? "w-64" : "w-20"
        )}>
            <div className="flex items-center gap-3 px-4 mb-10 w-full overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                    <Layout className="text-white w-6 h-6" />
                </div>
                {isOpen && <span className="font-bold text-lg tracking-tight whitespace-nowrap">Aura Diagram</span>}
            </div>

            <nav className="flex-1 w-full px-3 space-y-2">
                {menuItems.map((item, i) => (
                    <button
                        key={i}
                        className={cn(
                            "w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group",
                            item.active
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", item.active ? "text-blue-400" : "group-hover:text-white")} />
                        {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div className="px-3 w-full space-y-2">
                <button className="w-full flex items-center gap-4 p-3 text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                    {isOpen && <span className="text-sm">Settings</span>}
                </button>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center gap-4 p-3 text-gray-500 hover:text-white transition-colors border-t border-white/5 pt-4"
                >
                    <ChevronRight className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
                    {isOpen && <span className="text-sm">Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
