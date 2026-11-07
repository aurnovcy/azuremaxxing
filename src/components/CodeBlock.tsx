import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const getBadgeLabel = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'kusto':
      case 'kql':
        return 'KQL / Resource Graph';
      case 'powershell':
        return 'Azure PowerShell';
      case 'bash':
        return 'Azure CLI';
      case 'bicep':
        return 'Bicep';
      case 'json':
        return 'JSON';
      case 'sql':
        return 'SQL';
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <div className="my-4 rounded-lg border border-[#222222] bg-[#0a0a0a] overflow-hidden text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#1f1f1f] text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#3b9eff] font-medium">{getBadgeLabel(language)}</span>
          {title && <span className="text-[#a1a1a1] truncate max-w-[260px] md:max-w-md">· {title}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-[#ededed] hover:text-white bg-[#1a1a1a] hover:bg-[#262626] border border-[#2a2a2a] transition-colors"
          title="Copy code snippet"
          aria-label="Copy code snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#888888]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-xs text-[#ededed] leading-relaxed">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};
