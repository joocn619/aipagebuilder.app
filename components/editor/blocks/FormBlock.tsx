"use client";

import type { EditorBlock, GlobalStyles } from "@/lib/stores/editor-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormField {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface Props {
  block: EditorBlock;
  globalStyles: GlobalStyles;
  isEditing?: boolean;
  onContentChange?: (content: Record<string, unknown>) => void;
}

export function FormBlock({ block, globalStyles, isEditing, onContentChange }: Props) {
  const c = block.content as {
    heading?: string;
    description?: string;
    fields?: FormField[];
    submitText?: string;
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-6 text-center">
          {isEditing ? (
            <h2 className="text-3xl font-bold outline-none" contentEditable suppressContentEditableWarning
              onBlur={(e) => onContentChange?.({ heading: e.currentTarget.textContent || "" })}>
              {c.heading}
            </h2>
          ) : (
            <h2 className="text-3xl font-bold">{c.heading}</h2>
          )}
          {c.description && <p className="mt-2 text-muted-foreground">{c.description}</p>}
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {(c.fields || []).map((field, i) => (
            <div key={i} className="space-y-1.5">
              <Label>{field.label}{field.required && <span className="text-destructive"> *</span>}</Label>
              {field.type === "textarea" ? (
                <textarea className="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder={field.placeholder} />
              ) : (
                <Input type={field.type} placeholder={field.placeholder} />
              )}
            </div>
          ))}
          <Button className="w-full" style={{ backgroundColor: globalStyles.primaryColor }}
            onClick={(e) => isEditing && e.preventDefault()}>
            {c.submitText || "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
