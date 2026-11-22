'use client';

import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { UmlClassNode, ActivityNode, DecisionNode, StartNode, EndNode } from './CustomNodes';

const nodeTypes = {
    umlClass: UmlClassNode,
    activity: ActivityNode,
    decision: DecisionNode,
    start: StartNode,
    end: EndNode,
};

interface UmlCanvasProps {
    nodes: any[];
    edges: any[];
}

export default function UmlCanvas({ initialNodes, initialEdges }: { initialNodes: any[], initialEdges: any[] }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                colorMode="dark"
            >
                <Controls className="!bg-slate-800 !border-white/10 !fill-white" />
                <MiniMap className="!bg-slate-900/50" nodeColor="#3b82f6" />
                <Background gap={12} size={1} color="#333" />
            </ReactFlow>
        </div>
    );
}
