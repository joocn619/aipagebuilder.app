"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";

interface ComparisonRow { feature: string; values: string[]; }
interface Props { block: EditorBlock; globalStyles: GlobalStyles; isEditing?: boolean; onContentChange?: (content: Record<string, unknown>) => void; }

export function ComparisonBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as { heading?: string; columns?: string[]; rows?: ComparisonRow[]; };
  const cols = c.columns || ["Free", "Pro", "Enterprise"];
  const rows = c.rows || [];

  return (
    <div className="py-12">
      {c.heading && (
        <div className="mb-8 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>{c.heading}</h2>
          ) : (
            <h2 className="text-3xl font-bold">{c.heading}</h2>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b p-3 text-left font-medium text-muted-foreground">Feature</th>
              {cols.map((col, i) => (
                <th key={i} className="border-b p-3 text-center font-semibold" style={{ color: i === 1 ? globalStyles.primaryColor : undefined }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-3 font-medium">{row.feature}</td>
                {row.values.map((val, j) => (
                  <td key={j} className="p-3 text-center">
                    {val === "true" ? <span className="text-green-500">&#10003;</span> :
                     val === "false" ? <span className="text-muted-foreground">—</span> :
                     val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
