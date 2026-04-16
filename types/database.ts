export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          plan: string;
          stripe_customer_id: string | null;
          ai_credits_used: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: string;
          stripe_customer_id?: string | null;
          ai_credits_used?: number;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          plan?: string;
          stripe_customer_id?: string | null;
          ai_credits_used?: number;
        };
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          owner_id: string;
          plan: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          owner_id: string;
          plan?: string;
        };
        Update: {
          name?: string;
          plan?: string;
        };
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: string;
          invited_at: string;
          accepted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: string;
        };
        Update: {
          role?: string;
          accepted_at?: string | null;
        };
      };
      pages: {
        Row: {
          id: string;
          user_id: string;
          workspace_id: string | null;
          title: string;
          slug: string;
          custom_domain: string | null;
          template_id: string | null;
          status: string;
          blocks: Json;
          global_styles: Json;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          password_hash: string | null;
          published_at: string | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workspace_id?: string | null;
          title: string;
          slug: string;
          custom_domain?: string | null;
          template_id?: string | null;
          status?: string;
          blocks?: Json;
          global_styles?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          password_hash?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          workspace_id?: string | null;
          custom_domain?: string | null;
          template_id?: string | null;
          status?: string;
          blocks?: Json;
          global_styles?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          password_hash?: string | null;
          published_at?: string | null;
          view_count?: number;
        };
      };
      page_versions: {
        Row: {
          id: string;
          page_id: string;
          version_number: number;
          blocks: Json;
          global_styles: Json;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          version_number: number;
          blocks?: Json;
          global_styles?: Json;
          created_by?: string | null;
        };
        Update: {
          blocks?: Json;
          global_styles?: Json;
        };
      };
      block_types: {
        Row: {
          id: string;
          name: string;
          category: string;
          thumbnail: string | null;
          default_config: Json;
          is_pro: boolean;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          category: string;
          thumbnail?: string | null;
          default_config?: Json;
          is_pro?: boolean;
          sort_order?: number;
        };
        Update: {
          name?: string;
          category?: string;
          thumbnail?: string | null;
          default_config?: Json;
          is_pro?: boolean;
          sort_order?: number;
        };
      };
      templates: {
        Row: {
          id: string;
          name: string;
          category: string;
          thumbnail: string | null;
          blocks: Json;
          global_styles: Json;
          is_premium: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          thumbnail?: string | null;
          blocks?: Json;
          global_styles?: Json;
          is_premium?: boolean;
          sort_order?: number;
        };
        Update: {
          name?: string;
          category?: string;
          thumbnail?: string | null;
          blocks?: Json;
          global_styles?: Json;
          is_premium?: boolean;
          sort_order?: number;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          page_id: string;
          user_id: string | null;
          data: Json;
          source_url: string | null;
          ip_address: string | null;
          tags: string[];
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          user_id?: string | null;
          data: Json;
          source_url?: string | null;
          ip_address?: string | null;
          tags?: string[];
          notes?: string | null;
        };
        Update: {
          tags?: string[];
          notes?: string | null;
        };
      };
      page_events: {
        Row: {
          id: string;
          page_id: string;
          event_type: string;
          metadata: Json;
          visitor_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          event_type: string;
          metadata?: Json;
          visitor_id?: string | null;
        };
        Update: never;
      };
      ab_tests: {
        Row: {
          id: string;
          page_id: string;
          variant_name: string;
          blocks: Json;
          traffic_split: number;
          views: number;
          conversions: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          variant_name: string;
          blocks?: Json;
          traffic_split?: number;
        };
        Update: {
          variant_name?: string;
          blocks?: Json;
          traffic_split?: number;
          views?: number;
          conversions?: number;
          is_active?: boolean;
        };
      };
      popups: {
        Row: {
          id: string;
          user_id: string;
          page_id: string | null;
          name: string;
          type: string;
          trigger_type: string;
          trigger_value: string | null;
          content: Json;
          styles: Json;
          frequency: string;
          is_active: boolean;
          views: number;
          conversions: number;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          page_id?: string | null;
          name: string;
          type?: string;
          trigger_type?: string;
          trigger_value?: string | null;
          content?: Json;
          styles?: Json;
          frequency?: string;
        };
        Update: {
          name?: string;
          page_id?: string | null;
          type?: string;
          trigger_type?: string;
          trigger_value?: string | null;
          content?: Json;
          styles?: Json;
          frequency?: string;
          is_active?: boolean;
          views?: number;
          conversions?: number;
          start_date?: string | null;
          end_date?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          page_id: string;
          parent_id: string | null;
          author_name: string;
          author_email: string | null;
          block_id: string | null;
          content: string;
          status: string;
          position_x: number | null;
          position_y: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          parent_id?: string | null;
          author_name: string;
          author_email?: string | null;
          block_id?: string | null;
          content: string;
          position_x?: number | null;
          position_y?: number | null;
        };
        Update: {
          content?: string;
          status?: string;
        };
      };
      page_approvals: {
        Row: {
          id: string;
          page_id: string;
          reviewer_name: string;
          reviewer_email: string | null;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          reviewer_name: string;
          reviewer_email?: string | null;
          status: string;
          notes?: string | null;
        };
        Update: never;
      };
      personalization_rules: {
        Row: {
          id: string;
          page_id: string;
          rule_type: string;
          conditions: Json;
          block_overrides: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          rule_type: string;
          conditions: Json;
          block_overrides?: Json;
        };
        Update: {
          rule_type?: string;
          conditions?: Json;
          block_overrides?: Json;
          is_active?: boolean;
        };
      };
      heatmap_clicks: {
        Row: {
          id: string;
          page_id: string;
          visitor_id: string | null;
          x_pct: number;
          y_pct: number;
          element_tag: string | null;
          device_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          visitor_id?: string | null;
          x_pct: number;
          y_pct: number;
          element_tag?: string | null;
          device_type?: string | null;
        };
        Update: never;
      };
      scroll_events: {
        Row: {
          id: string;
          page_id: string;
          visitor_id: string | null;
          max_depth_pct: number;
          device_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          visitor_id?: string | null;
          max_depth_pct: number;
          device_type?: string | null;
        };
        Update: never;
      };
      funnels: {
        Row: {
          id: string;
          user_id: string;
          workspace_id: string | null;
          name: string;
          steps: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workspace_id?: string | null;
          name: string;
          steps?: Json;
        };
        Update: {
          name?: string;
          workspace_id?: string | null;
          steps?: Json;
          is_active?: boolean;
        };
      };
      funnel_events: {
        Row: {
          id: string;
          funnel_id: string;
          step_index: number;
          visitor_id: string | null;
          event_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          funnel_id: string;
          step_index: number;
          visitor_id?: string | null;
          event_type: string;
        };
        Update: never;
      };
      auto_responders: {
        Row: {
          id: string;
          page_id: string;
          user_id: string | null;
          subject: string;
          body_html: string;
          is_active: boolean;
          sent_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          user_id?: string | null;
          subject: string;
          body_html: string;
        };
        Update: {
          subject?: string;
          body_html?: string;
          is_active?: boolean;
          sent_count?: number;
        };
      };
      page_translations: {
        Row: {
          id: string;
          page_id: string;
          language_code: string;
          blocks: Json;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          language_code: string;
          blocks?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
        };
        Update: {
          blocks?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          workspace_id: string | null;
          entity_type: string;
          entity_id: string | null;
          action: string;
          details: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          workspace_id?: string | null;
          entity_type: string;
          entity_id?: string | null;
          action: string;
          details?: Json;
        };
        Update: never;
      };
      session_recordings: {
        Row: {
          id: string;
          page_id: string;
          visitor_id: string;
          device_type: string | null;
          duration_ms: number | null;
          events: Json;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          visitor_id: string;
          device_type?: string | null;
          duration_ms?: number | null;
          events?: Json;
          tags?: string[];
        };
        Update: {
          duration_ms?: number | null;
          events?: Json;
          tags?: string[];
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          workspace_id: string | null;
          name: string;
          key_hash: string;
          key_prefix: string;
          last_used_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workspace_id?: string | null;
          name: string;
          key_hash: string;
          key_prefix: string;
        };
        Update: {
          name?: string;
          last_used_at?: string | null;
          is_active?: boolean;
        };
      };
      integrations: {
        Row: {
          id: string;
          workspace_id: string;
          type: string;
          config: Json;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          type: string;
          config?: Json;
        };
        Update: {
          config?: Json;
          is_active?: boolean;
        };
      };
      popup_templates: {
        Row: {
          id: string;
          name: string;
          type: string;
          thumbnail: string | null;
          content: Json;
          styles: Json;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          thumbnail?: string | null;
          content?: Json;
          styles?: Json;
          sort_order?: number;
        };
        Update: {
          name?: string;
          type?: string;
          content?: Json;
          styles?: Json;
          sort_order?: number;
        };
      };
      funnel_templates: {
        Row: {
          id: string;
          name: string;
          category: string;
          thumbnail: string | null;
          steps: Json;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          thumbnail?: string | null;
          steps?: Json;
          sort_order?: number;
        };
        Update: {
          name?: string;
          category?: string;
          steps?: Json;
          sort_order?: number;
        };
      };
    };
  };
}

// Convenience type aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Workspace = Database["public"]["Tables"]["workspaces"]["Row"];
export type WorkspaceMember = Database["public"]["Tables"]["workspace_members"]["Row"];
export type Page = Database["public"]["Tables"]["pages"]["Row"];
export type PageVersion = Database["public"]["Tables"]["page_versions"]["Row"];
export type BlockType = Database["public"]["Tables"]["block_types"]["Row"];
export type Template = Database["public"]["Tables"]["templates"]["Row"];
export type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"];
export type PageEvent = Database["public"]["Tables"]["page_events"]["Row"];
export type AbTest = Database["public"]["Tables"]["ab_tests"]["Row"];
export type Popup = Database["public"]["Tables"]["popups"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type PageApproval = Database["public"]["Tables"]["page_approvals"]["Row"];
export type PersonalizationRule = Database["public"]["Tables"]["personalization_rules"]["Row"];
export type HeatmapClick = Database["public"]["Tables"]["heatmap_clicks"]["Row"];
export type ScrollEvent = Database["public"]["Tables"]["scroll_events"]["Row"];
export type Funnel = Database["public"]["Tables"]["funnels"]["Row"];
export type FunnelEvent = Database["public"]["Tables"]["funnel_events"]["Row"];
export type AutoResponder = Database["public"]["Tables"]["auto_responders"]["Row"];
export type PageTranslation = Database["public"]["Tables"]["page_translations"]["Row"];
export type ActivityLogEntry = Database["public"]["Tables"]["activity_log"]["Row"];
export type SessionRecording = Database["public"]["Tables"]["session_recordings"]["Row"];
export type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];
export type Integration = Database["public"]["Tables"]["integrations"]["Row"];
export type PopupTemplate = Database["public"]["Tables"]["popup_templates"]["Row"];
export type FunnelTemplate = Database["public"]["Tables"]["funnel_templates"]["Row"];
