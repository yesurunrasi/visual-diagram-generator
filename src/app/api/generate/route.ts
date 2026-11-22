import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openrouter/free";

const UML_SYSTEM_PROMPT = `You are a UML Diagram Expert. Your task is to convert a user prompt into a valid JSON structure for React Flow.
The JSON must have this structure:
{
  "type": "uml",
  "data": {
    "nodes": [
      { 
        "id": "string", 
        "type": "umlClass" | "activity" | "decision" | "start" | "end", 
        "position": { "x": number, "y": number },
        "data": { 
          "label": "string",
          "attributes": ["optional array of strings for umlClass"],
          "methods": ["optional array of strings for umlClass"]
        }
      }
    ],
    "edges": [
      { "id": "string", "source": "string", "target": "string", "label": "optional string" }
    ]
  }
}

Use "umlClass" for class diagrams. Use "activity", "decision", "start", "end" for activity/flow diagrams.
Arrange nodes logically (top-to-bottom or left-to-right).
Return ONLY the JSON. No markdown formatting, no explanations.`;

const BPMN_SYSTEM_PROMPT = `You are a BPMN 2.0 Expert. Your task is to convert a user prompt into a valid BPMN 2.0 XML string.
The XML must be compatible with bpmn-js and adhere to standard BPMN 2.0 schema.
Return ONLY the XML string. No markdown formatting, no explanations.`;

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_key_here' || OPENROUTER_API_KEY.length < 10) {
            return NextResponse.json({ error: 'OpenRouter API Key not configured' }, { status: 500 });
        }

        const isBpmn = prompt.toLowerCase().includes('bpmn') || prompt.toLowerCase().includes('process');
        const systemPrompt = isBpmn ? BPMN_SYSTEM_PROMPT : UML_SYSTEM_PROMPT;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY.trim()}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Aura Diagram Generator"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2
            })
        });

        const result = await response.json();

        if (!result.choices || result.choices.length === 0) {
            return NextResponse.json({ error: 'AI provider error: ' + (result.error?.message || 'Empty response from provider') }, { status: 502 });
        }

        const content = result.choices[0].message.content.trim();

        if (isBpmn) {
            const cleanedXml = content.replace(/^```xml\n?/, '').replace(/\n?```$/, '');
            return NextResponse.json({
                type: 'bpmn',
                data: cleanedXml
            });
        } else {
            const cleanedJson = content.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            try {
                const parsedData = JSON.parse(cleanedJson);
                return NextResponse.json(parsedData);
            } catch (jsonErr) {
                return NextResponse.json({ error: 'Failed to parse AI response as JSON.' }, { status: 500 });
            }
        }
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to generate diagram: ' + error.message }, { status: 500 });
    }
}
