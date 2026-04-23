"use client";

import { useEditorStore, type BlockStyles } from "@/lib/stores/editor-store";
import { BLOCK_TYPES, BLOCK_CATEGORIES } from "@/lib/constants/blocks";
import { getPresetsForBlock } from "@/lib/constants/block-presets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ============================================
// Block Library Tab
// ============================================

function BlockLibrary() {
  const { addBlock } = useEditorStore();

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-semibold">Add Block</h3>
      {BLOCK_CATEGORIES.map((cat) => {
        const catBlocks = BLOCK_TYPES.filter((b) => b.category === cat);
        if (catBlocks.length === 0) return null;
        return (
          <div key={cat}>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
              {cat}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {catBlocks.map((block) => (
                <button
                  key={block.id}
                  className="flex flex-col items-center gap-1 rounded-lg border p-3 text-xs hover:bg-accent transition-colors"
                  onClick={() => addBlock(block.id)}
                >
                  <span className="text-lg">
                    {block.id === "hero" ? "H" : block.id === "features" ? "F" : block.id === "form" ? "F" : block.name.charAt(0)}
                  </span>
                  <span className="truncate">{block.name}</span>
                  {block.isPro && (
                    <span className="text-[9px] font-medium text-primary">PRO</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// Block Settings Tab
// ============================================

function BlockSettings() {
  const { blocks, selectedBlockId, updateBlockContent, updateBlockStyles } =
    useEditorStore();

  const block = blocks.find((b) => b.id === selectedBlockId);

  if (!block) {
    return (
      <div className="flex h-40 items-center justify-center p-4 text-sm text-muted-foreground">
        Select a block to edit its settings
      </div>
    );
  }

  const updateStyle = (key: keyof BlockStyles, value: number | string | undefined) => {
    updateBlockStyles(block.id, { [key]: value });
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div>
          <h3 className="mb-3 text-sm font-semibold">
            {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Settings
          </h3>

          {/* Content fields — render common text fields */}
          {typeof block.content.heading === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">Heading</Label>
              <Input
                value={block.content.heading as string}
                onChange={(e) => updateBlockContent(block.id, { heading: e.target.value })}
              />
            </div>
          )}
          {typeof block.content.subheadline === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">Subheadline</Label>
              <Input
                value={block.content.subheadline as string}
                onChange={(e) => updateBlockContent(block.id, { subheadline: e.target.value })}
              />
            </div>
          )}
          {typeof block.content.subheading === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">Subheading</Label>
              <Input
                value={block.content.subheading as string}
                onChange={(e) => updateBlockContent(block.id, { subheading: e.target.value })}
              />
            </div>
          )}
          {typeof block.content.headline === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">Headline</Label>
              <Input
                value={block.content.headline as string}
                onChange={(e) => updateBlockContent(block.id, { headline: e.target.value })}
              />
            </div>
          )}
          {typeof block.content.ctaText === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">CTA Text</Label>
              <Input
                value={block.content.ctaText as string}
                onChange={(e) => updateBlockContent(block.id, { ctaText: e.target.value })}
              />
            </div>
          )}
          {typeof block.content.ctaUrl === "string" && (
            <div className="mb-3 space-y-1.5">
              <Label className="text-xs">CTA URL</Label>
              <Input
                value={block.content.ctaUrl as string}
                onChange={(e) => updateBlockContent(block.id, { ctaUrl: e.target.value })}
              />
            </div>
          )}
        </div>

        <Separator />

        {/* Style controls */}
        <div>
          <h3 className="mb-3 text-sm font-semibold">Style</h3>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Background Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={block.styles.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border"
              />
              <Input
                value={block.styles.backgroundColor || ""}
                onChange={(e) => updateStyle("backgroundColor", e.target.value || undefined)}
                placeholder="transparent"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Text Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={block.styles.textColor || "#000000"}
                onChange={(e) => updateStyle("textColor", e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border"
              />
              <Input
                value={block.styles.textColor || ""}
                onChange={(e) => updateStyle("textColor", e.target.value || undefined)}
                placeholder="inherit"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Padding Top: {block.styles.paddingTop ?? 48}px</Label>
            <Slider
              value={[block.styles.paddingTop ?? 48]}
              min={0}
              max={200}
              step={4}
              onValueChange={([v]) => updateStyle("paddingTop", v)}
            />
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Padding Bottom: {block.styles.paddingBottom ?? 48}px</Label>
            <Slider
              value={[block.styles.paddingBottom ?? 48]}
              min={0}
              max={200}
              step={4}
              onValueChange={([v]) => updateStyle("paddingBottom", v)}
            />
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Border Radius: {block.styles.borderRadius ?? 0}px</Label>
            <Slider
              value={[block.styles.borderRadius ?? 0]}
              min={0}
              max={32}
              step={1}
              onValueChange={([v]) => updateStyle("borderRadius", v)}
            />
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Opacity: {block.styles.opacity ?? 100}%</Label>
            <Slider
              value={[(block.styles.opacity ?? 1) * 100]}
              min={0}
              max={100}
              step={5}
              onValueChange={([v]) => updateStyle("opacity", v / 100)}
            />
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Box Shadow</Label>
            <Select value={block.styles.boxShadow || "none"} onValueChange={(v) => updateStyle("boxShadow", v === "none" ? undefined : v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="0 1px 3px rgba(0,0,0,0.12)">Small</SelectItem>
                <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">Medium</SelectItem>
                <SelectItem value="0 10px 25px rgba(0,0,0,0.15)">Large</SelectItem>
                <SelectItem value="0 20px 50px rgba(0,0,0,0.2)">XL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Backdrop Blur: {block.styles.backdropBlur ?? 0}px</Label>
            <Slider value={[block.styles.backdropBlur ?? 0]} min={0} max={20} step={1} onValueChange={([v]) => updateStyle("backdropBlur", v)} />
          </div>
        </div>

        <Separator />

        {/* Animation */}
        <div>
          <h3 className="mb-3 text-sm font-semibold">Animation</h3>
          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Entrance Animation</Label>
            <Select value={block.styles.animation || "none"} onValueChange={(v) => updateStyle("animation", v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="fade-in">Fade In</SelectItem>
                <SelectItem value="slide-up">Slide Up</SelectItem>
                <SelectItem value="slide-left">Slide Left</SelectItem>
                <SelectItem value="zoom-in">Zoom In</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-3 space-y-1.5">
            <Label className="text-xs">Hover Effect</Label>
            <Select value={block.styles.hoverEffect || "none"} onValueChange={(v) => updateStyle("hoverEffect", v)}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="lift">Lift</SelectItem>
                <SelectItem value="glow">Glow</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Device Visibility */}
        <div>
          <h3 className="mb-3 text-sm font-semibold">Device Visibility</h3>
          <div className="space-y-2">
            {(["desktop", "tablet", "mobile"] as const).map((device) => (
              <div key={device} className="flex items-center justify-between">
                <Label className="text-xs capitalize">{device}</Label>
                <Switch
                  checked={!block.hidden?.[device]}
                  onCheckedChange={(checked) => {
                    const hidden = { ...block.hidden, [device]: !checked };
                    useEditorStore.getState().updateBlockHidden(block.id, hidden);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Presets */}
        {getPresetsForBlock(block.type).length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold">Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              {getPresetsForBlock(block.type).map((preset) => (
                <button
                  key={preset.id}
                  className="rounded-lg border p-2 text-xs hover:bg-accent transition-colors"
                  style={{ backgroundColor: preset.styles.backgroundColor, color: preset.styles.textColor }}
                  onClick={() => useEditorStore.getState().applyPreset(block.id, preset.styles, preset.contentOverrides)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

// ============================================
// Global Styles Tab
// ============================================

function GlobalStylesPanel() {
  const { globalStyles, setGlobalStyles } = useEditorStore();

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-semibold">Global Styles</h3>

      <div className="space-y-1.5">
        <Label className="text-xs">Primary Color</Label>
        <div className="flex gap-2">
          <input type="color" value={globalStyles.primaryColor} onChange={(e) => setGlobalStyles({ primaryColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded border" />
          <Input value={globalStyles.primaryColor} onChange={(e) => setGlobalStyles({ primaryColor: e.target.value })} className="h-8 text-xs" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Secondary Color</Label>
        <div className="flex gap-2">
          <input type="color" value={globalStyles.secondaryColor} onChange={(e) => setGlobalStyles({ secondaryColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded border" />
          <Input value={globalStyles.secondaryColor} onChange={(e) => setGlobalStyles({ secondaryColor: e.target.value })} className="h-8 text-xs" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Body Font</Label>
        <Select value={globalStyles.fontFamily} onValueChange={(v) => setGlobalStyles({ fontFamily: v })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Nunito", "DM Sans", "Space Grotesk", "Plus Jakarta Sans", "Manrope", "Sora", "Outfit", "Playfair Display", "Merriweather"].map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Heading Font</Label>
        <Select value={globalStyles.headingFont} onValueChange={(v) => setGlobalStyles({ headingFont: v })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Nunito", "DM Sans", "Space Grotesk", "Plus Jakarta Sans", "Manrope", "Sora", "Outfit", "Playfair Display", "Merriweather"].map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Border Radius: {globalStyles.borderRadius}px</Label>
        <Slider value={[globalStyles.borderRadius]} min={0} max={24} step={1} onValueChange={([v]) => setGlobalStyles({ borderRadius: v })} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Base Font Size: {globalStyles.baseFontSize}px</Label>
        <Slider value={[globalStyles.baseFontSize]} min={12} max={24} step={1} onValueChange={([v]) => setGlobalStyles({ baseFontSize: v })} />
      </div>
    </div>
  );
}

// ============================================
// Page Structure Tree
// ============================================

function StructureTree() {
  const { blocks, selectedBlockId, selectBlock } = useEditorStore();

  return (
    <div className="p-4">
      <h3 className="mb-3 text-sm font-semibold">Page Structure</h3>
      {blocks.length === 0 ? (
        <p className="text-xs text-muted-foreground">No blocks added yet</p>
      ) : (
        <div className="space-y-1">
          {blocks.map((block, i) => (
            <button
              key={block.id}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors ${
                selectedBlockId === block.id ? "bg-primary/10 text-primary" : "hover:bg-accent"
              }`}
              onClick={() => selectBlock(block.id)}
            >
              <span className="text-muted-foreground">{i + 1}.</span>
              <span className="font-medium">{block.type}</span>
              {typeof block.content.heading === "string" && (
                <span className="truncate text-muted-foreground">
                  — {(block.content.heading as string).slice(0, 20)}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Custom Code Tab
// ============================================

function CustomCodePanel() {
  const { customCss, customJs, setCustomCss, setCustomJs } = useEditorStore();

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label className="text-xs">Custom CSS</Label>
        <textarea
          className="mt-1.5 h-40 w-full rounded-md border bg-white/5 p-2 font-mono text-xs"
          value={customCss}
          onChange={(e) => setCustomCss(e.target.value)}
          placeholder="/* Your custom CSS */"
        />
      </div>
      <div>
        <Label className="text-xs">Custom JavaScript</Label>
        <textarea
          className="mt-1.5 h-40 w-full rounded-md border bg-white/5 p-2 font-mono text-xs"
          value={customJs}
          onChange={(e) => setCustomJs(e.target.value)}
          placeholder="// Your custom JavaScript"
        />
      </div>
    </div>
  );
}

// ============================================
// Main Sidebar
// ============================================

export function EditorSidebar() {
  const { sidebarTab, setSidebarTab } = useEditorStore();

  return (
    <div className="flex h-full w-72 flex-col border-l border-white/5 bg-[#0d0d18] text-white">
      <Tabs
        value={sidebarTab}
        onValueChange={(v) => setSidebarTab(v as typeof sidebarTab)}
        className="flex h-full flex-col"
      >
        <TabsList className="mx-2 mt-2 grid grid-cols-5">
          <TabsTrigger value="blocks" className="text-[10px] px-1">Blocks</TabsTrigger>
          <TabsTrigger value="settings" className="text-[10px] px-1">Settings</TabsTrigger>
          <TabsTrigger value="styles" className="text-[10px] px-1">Styles</TabsTrigger>
          <TabsTrigger value="tree" className="text-[10px] px-1">Tree</TabsTrigger>
          <TabsTrigger value="code" className="text-[10px] px-1">Code</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto">
          <TabsContent value="blocks" className="m-0">
            <BlockLibrary />
          </TabsContent>
          <TabsContent value="settings" className="m-0 h-full">
            <BlockSettings />
          </TabsContent>
          <TabsContent value="styles" className="m-0">
            <GlobalStylesPanel />
          </TabsContent>
          <TabsContent value="tree" className="m-0">
            <StructureTree />
          </TabsContent>
          <TabsContent value="code" className="m-0">
            <CustomCodePanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
