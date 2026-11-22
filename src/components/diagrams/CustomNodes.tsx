import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

export const UmlClassNode = memo(({ data, selected }: any) => {
    return (
        <div className={cn(
            "min-w-[180px] bg-white text-black border-2 border-slate-800 rounded-sm shadow-xl flex flex-col overflow-hidden transition-all",
            selected ? "ring-2 ring-blue-500 ring-offset-2" : "border-slate-800"
        )}>
            <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-800" />

            {/* Header */}
            <div className="bg-slate-100 px-3 py-2 border-b border-slate-800 text-center">
                <div className="text-[10px] uppercase tracking-tighter font-bold text-slate-500">«Class»</div>
                <div className="font-bold text-sm text-slate-900">{data.label || 'NewClass'}</div>
            </div>

            {/* Attributes */}
            <div className="px-3 py-2 border-b border-slate-800 flex flex-col gap-0.5 min-h-[30px]">
                {data.attributes?.map((attr: string, i: number) => (
                    <div key={i} className="text-[11px] font-mono leading-tight">{attr}</div>
                ))}
                {(!data.attributes || data.attributes.length === 0) && <div className="h-4" />}
            </div>

            {/* Methods */}
            <div className="px-3 py-2 flex flex-col gap-0.5 min-h-[30px]">
                {data.methods?.map((method: string, i: number) => (
                    <div key={i} className="text-[11px] font-mono leading-tight">{method}</div>
                ))}
                {(!data.methods || data.methods.length === 0) && <div className="h-4" />}
            </div>

            <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-slate-800" />
        </div>
    );
});

UmlClassNode.displayName = 'UmlClassNode';

export const ActivityNode = memo(({ data, selected }: any) => {
    return (
        <div className={cn(
            "min-w-[120px] px-4 py-2 bg-[#f0f9ff] text-blue-900 border-2 border-blue-400 rounded-full shadow-md text-center flex items-center justify-center transition-all",
            selected ? "ring-2 ring-blue-500 ring-offset-2" : ""
        )}>
            <Handle type="target" position={Position.Top} className="!bg-blue-400" />
            <span className="text-xs font-semibold">{data.label}</span>
            <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
        </div>
    );
});

export const DecisionNode = memo(({ data, selected }: any) => {
    return (
        <div className={cn(
            "w-12 h-12 bg-[#fffbeb] border-2 border-amber-400 rotate-45 flex items-center justify-center shadow-md transition-all",
            selected ? "ring-2 ring-amber-500 ring-offset-2" : ""
        )}>
            <Handle type="target" position={Position.Top} className="!w-1 !h-1 !bg-amber-400 -translate-x-1/2 -translate-y-1/2" style={{ left: 0, top: 0 }} />
            <Handle type="target" position={Position.Left} className="!w-1 !h-1 !bg-amber-400 translate-x-1/2 -translate-y-1/2" style={{ left: 0, top: '100%' }} />

            <div className="-rotate-45 text-[10px] font-bold text-amber-900 text-center px-1 leading-tight">
                {data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className="!w-1 !h-1 !bg-amber-400 translate-x-1/2 translate-y-1/2" style={{ left: '100%', top: '100%' }} />
            <Handle type="source" position={Position.Right} className="!w-1 !h-1 !bg-amber-400 -translate-x-1/2 translate-y-1/2" style={{ left: '100%', top: 0 }} />
        </div>
    );
});

DecisionNode.displayName = 'DecisionNode';

export const StartNode = memo(() => (
    <div className="w-8 h-8 bg-slate-900 border-2 border-slate-700 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-slate-400 rounded-full" />
        <Handle type="source" position={Position.Bottom} className="!bg-slate-400" />
    </div>
));

StartNode.displayName = 'StartNode';

export const EndNode = memo(() => (
    <div className="w-8 h-8 bg-white border-2 border-slate-900 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
        </div>
        <Handle type="target" position={Position.Top} className="!bg-slate-900" />
    </div>
));

EndNode.displayName = 'EndNode';
