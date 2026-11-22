# Visual Technical Diagram Generator (AI-Powered UML & BPMN 2.0)

An interactive web-based technical diagramming tool designed for **Business Analysts, System Analysts, and Process Improvement teams**. Users can generate and edit **UML diagrams** (Class, Activity, Flowchart) and **BPMN 2.0 business process diagrams** from natural language prompts or drag-and-drop canvas editing.

## Key Features
- **AI Prompt-to-Diagram Pipeline:** Converts natural language requirements into structured React Flow JSON (UML) or valid BPMN 2.0 XML via server-side API route (`/api/generate`).
- **Interactive Dual Canvas:** Powered by `@xyflow/react` (React Flow) for UML/architecture flows and `bpmn-js` for industry-standard BPMN 2.0 modeling.
- **Business & System Analysis Workflow:** Bridges requirement gathering and visual process documentation without manual diagramming bottlenecks.

## Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Diagram Engines:** `@xyflow/react` (React Flow), `bpmn-js`
- **AI Integration:** OpenRouter Chat Completions API (configured securely via server-side environment variable)

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and set your own `OPENROUTER_API_KEY`:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

> **Security Note:** `.env.local` and API keys are never committed to this repository.
