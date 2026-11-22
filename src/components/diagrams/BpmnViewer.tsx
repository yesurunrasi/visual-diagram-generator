'use client';

import React, { useEffect, useRef } from 'react';
import BpmnJS from 'bpmn-js/dist/bpmn-viewer.production.min.js';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

interface BpmnViewerProps {
    xml: string;
}

export default function BpmnViewer({ xml }: BpmnViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        viewerRef.current = new BpmnJS({
            container: containerRef.current,
        });

        const renderDiagram = async () => {
            try {
                await viewerRef.current.importXML(xml);
                viewerRef.current.get('canvas').zoom('fit-viewport');
            } catch (err) {
                console.error('Error rendering BPMN:', err);
            }
        };

        if (xml) {
            renderDiagram();
        }

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
            }
        };
    }, [xml]);

    return (
        <div className="w-full h-full relative bg-white rounded-3xl overflow-hidden">
            <div ref={containerRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 z-10">
                <div className="bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">BPMN Standard View</span>
                </div>
            </div>
        </div>
    );
}
