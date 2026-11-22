'use client';

import { useState, useMemo, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import PromptEntry from '@/components/PromptEntry';
import UmlCanvas from '@/components/diagrams/UmlCanvas';
import BpmnViewer from '@/components/diagrams/BpmnViewer';
import { Download, Share2, ZoomIn, ZoomOut, MoreHorizontal, Wand2 } from 'lucide-react';

const MOCK_BPMN_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_1" name="User Login">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1_di" bpmnElement="Task_1">
        <dc:Bounds x="260" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="422" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="260" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="360" y="120" />
        <di:waypoint x="422" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const MOCK_UML_DATA = {
  nodes: [
    {
      id: 'n1',
      type: 'umlClass',
      position: { x: 100, y: 100 },
      data: {
        label: 'AuthService',
        attributes: ['+ username: string', '+ secret: string'],
        methods: ['+ login(): boolean', '+ logout(): void']
      },
    },
    {
      id: 'n2',
      type: 'umlClass',
      position: { x: 400, y: 100 },
      data: {
        label: 'User',
        attributes: ['+ id: UUID', '+ email: string'],
        methods: ['+ getProfile(): Profile']
      },
    },
    {
      id: 'a1',
      type: 'activity',
      position: { x: 250, y: 300 },
      data: { label: 'Validate Credentials' },
    },
  ],
  edges: [
    { id: 'e1-2', source: 'n1', target: 'n2', label: 'uses' },
    { id: 'e1-a', source: 'n1', target: 'a1' },
  ]
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'uml' | 'bpmn' | null>(null);
  const [diagramData, setDiagramData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();

      if (result.type) {
        setDiagramData(result.data);
        setActiveView(result.type);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <div className="h-screen bg-[#050505]" />;

  return (
    <main className="flex h-screen bg-[#050505] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header / Canvas Controls */}
        <header className="h-16 flex items-center justify-between px-8 bg-transparent z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-gray-400">
              {activeView ? (activeView === 'bpmn' ? 'Process Diagram.bpmn' : 'System Architecture.uml') : 'Untitled Diagram'}
            </h1>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><ZoomIn size={16} /></button>
              <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><ZoomOut size={16} /></button>
              <span className="text-[11px] px-2 text-gray-400 font-mono">100%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all border border-white/10">
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-semibold transition-all shadow-xl">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors"><MoreHorizontal size={20} /></button>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 relative overflow-hidden group p-4">
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1.5px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

          <div className="absolute inset-x-0 bottom-12 z-20">
            <PromptEntry onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Canvas Implementation */}
          <div className="w-full h-full relative z-0">
            {!activeView ? (
              <div className="w-full h-full flex items-center justify-center p-20">
                <div className="text-center space-y-4 max-w-md animate-in fade-in zoom-in duration-700">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                    < Wand2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Create something amazing</h2>
                  <p className="text-gray-500 text-sm">Use the AI prompt below to generate Visio-quality UML and BPMN diagrams instantly.</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeView === 'uml' && diagramData ? (
                  <UmlCanvas key={JSON.stringify(diagramData)} initialNodes={diagramData.nodes} initialEdges={diagramData.edges} />
                ) : activeView === 'bpmn' && typeof diagramData === 'string' ? (
                  <BpmnViewer xml={diagramData} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
