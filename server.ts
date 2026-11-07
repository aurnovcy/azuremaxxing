import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are "Azure maxxing AI", an expert Azure FinOps optimization engine and senior cloud architect for the azuremaxxing guide ("The Field Guide to Getting Maximum Value from Every Azure Dollar").

Core rules you must strictly enforce:
1. THE ORDER OF OPERATIONS:
   1 See it → 2 Own it → 3 Delete it → 4 Shrink it → 5 License it → 6 Schedule it → 7 Commit to it → 8 Re-architect it → 9 Govern it.
   Rule: "Commit AFTER you shrink." Never recommend purchasing new reservations or savings plans before deleting orphans, rightsizing over-provisioned VMs/DBs, and scheduling non-production environments. With exchanges disappearing for savings-plan-covered services, committing to oversized resources is a one-way financial trap.

2. DEADLINE EXPOSURE CHECKS:
   - Always evaluate exposure to the February 1, 2027 Reservation Exchange Change:
     Reservations for services covered by savings plans (compute and databases) purchased on or after Feb 1, 2027 cannot be exchanged. Existing reservations purchased before that date keep one final exchange. Auto-renewals after the cutoff are non-exchangeable new purchases.
   - Always evaluate exposure to Windows Server 2016 End of Extended Support (January 12, 2027):
     Recommend Arc onboarding for monthly pay-as-you-go ESUs or in-place upgrade.
   - Always evaluate SQL Server 2016 (EOS passed July 14, 2026) and SQL Server 2014 (ESU ends July 12, 2027).

3. THE THREE LEVERS:
   - Rate Optimization: Lower unit price (Reservations, Savings Plans, Spot, MACC, Credits).
   - Usage Optimization: Lower quantity (Cleanup, Rightsizing, Auto-shutdown, Storage lifecycle).
   - License Optimization: Remove license cost (Azure Hybrid Benefit for Windows/SQL, Dev/Test subscriptions, SQL Edition sizing). License optimization is a signature Azure lever!

4. TIP RECOMMENDATIONS:
   Whenever recommending actions, cite specific tip IDs from the library:
   - Commitments: COM-01, COM-02, COM-03, COM-04, COM-05, COM-06, COM-07, COM-08, COM-13, COM-15
   - Licensing: LIC-01, LIC-02, LIC-03, LIC-05, LIC-08
   - VMs & Compute: VM-01, VM-02, VM-04, VM-05, VM-08, VM-10
   - AKS: AKS-01, AKS-03, AKS-05, AKS-08
   - Storage & Disks: DSK-01, DSK-03, DSK-07, STG-01, STG-02
   - Databases: DB-01, DB-03, DB-11, DB-13
   - Networking: NET-01, NET-12, NET-19
   - Observability: MON-01, MON-02, MON-05
   - AI & Foundry: AI-01, AI-02, AI-03, AI-04, AI-07
   - Lifecycle: EOS-01, EOS-02, EOS-03, EOS-05
   - Startup: STU-01, STU-03, STU-05

5. FACTUAL INTEGRITY & CAUTION:
   Never invent or quote fake dollar price lists or unverified discounts. Remind users that prices depend on region, currency, agreement type (EA, MCA, CSP, pay-as-you-go), and date, and to verify against Microsoft Learn and Azure Pricing.`;

// Structured schema for recommendation output
const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: 'A punchy, confident, executive summary of the user situation and primary optimization theme.',
    },
    deadlineAlert: {
      type: Type.STRING,
      description: 'Specific analysis of the user exposure to the Feb 1, 2027 reservation exchange cutoff or Windows/SQL 2016 deadlines.',
    },
    estimatedSavingsPotential: {
      type: Type.STRING,
      description: 'Estimated relative savings percentage or key impact narrative (e.g. "25% - 40% reduction across compute and licensing").',
    },
    prioritizedActions: {
      type: Type.ARRAY,
      description: 'Ordered list of concrete, prioritized actions following the order of operations.',
      items: {
        type: Type.OBJECT,
        properties: {
          stepNumber: { type: Type.INTEGER },
          title: { type: Type.STRING },
          tipId: { type: Type.STRING, description: 'Matching tip ID e.g. COM-02, LIC-01, VM-01, DSK-01, DB-01' },
          lever: { type: Type.STRING, description: 'rate, usage, or license' },
          effort: { type: Type.STRING, description: 'low, med, or high' },
          impact: { type: Type.STRING, description: '$, $$, or $$$' },
          description: { type: Type.STRING },
          verification: { type: Type.STRING, description: 'How to verify the savings in Azure Cost Management or Resource Graph' },
        },
        required: ['stepNumber', 'title', 'tipId', 'lever', 'effort', 'impact', 'description', 'verification'],
      },
    },
    orderOfOperationsWarning: {
      type: Type.STRING,
      description: 'Explicit warning if the user was planning to buy commitments before shrinking resources.',
    },
    disclaimer: {
      type: Type.STRING,
      description: 'Standard pricing variance reminder citing region, agreement type, and verification advice.',
    },
  },
  required: ['headline', 'deadlineAlert', 'estimatedSavingsPotential', 'prioritizedActions', 'disclaimer'],
};

// API Endpoint for Ask Azure maxxing
app.post('/api/ask', async (req, res) => {
  try {
    const { prompt, monthlySpend, agreementType, topServices, windowsSqlFootprint, reservationsStatus } = req.body;

    const userContext = `
User Context:
- Monthly Azure Spend Range: ${monthlySpend || 'Not specified'}
- Agreement Type: ${agreementType || 'Not specified'}
- Top Services: ${topServices || 'Not specified'}
- Windows Server & SQL Server Footprint: ${windowsSqlFootprint || 'Not specified'}
- Existing Reservations & Savings Plans: ${reservationsStatus || 'Not specified'}

User Description / Query / Pasted CSV data:
${prompt || 'Analyze my setup based on the context above and generate a prioritized Azure maxxing action plan.'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userContext,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = {
        headline: 'Optimization Strategy Analysis',
        deadlineAlert: 'Review your compute and database reservations before February 1, 2027.',
        estimatedSavingsPotential: '20% - 35% overall reduction',
        prioritizedActions: [],
        disclaimer: 'Pricing mechanics and relative discounts only; verify against Azure pricing.',
      };
    }

    res.json({ success: true, data: parsedData });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to generate recommendations';
    console.error('Error generating optimization plan:', err);
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: 'Failed to generate advice. Please verify that GEMINI_API_KEY is configured in your Secrets panel.',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Azure maxxing server running on http://0.0.0.0:${port}`);
  });
}

startServer();
