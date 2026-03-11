export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      advertisement: {
        Row: {
          advertisement_id: string
          created_at: string
          description: string
          title: string
          typ: Database["public"]["Enums"]["advertisment_type"]
          updatet_at: string
          user_id: string
        }
        Insert: {
          advertisement_id?: string
          created_at?: string
          description: string
          title: string
          typ: Database["public"]["Enums"]["advertisment_type"]
          updatet_at?: string
          user_id: string
        }
        Update: {
          advertisement_id?: string
          created_at?: string
          description?: string
          title?: string
          typ?: Database["public"]["Enums"]["advertisment_type"]
          updatet_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advertisment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      availability: {
        Row: {
          availability_id: string
          end_time: string
          is_booked: boolean | null
          start_time: string
          user_id: string
        }
        Insert: {
          availability_id?: string
          end_time: string
          is_booked?: boolean | null
          start_time: string
          user_id: string
        }
        Update: {
          availability_id?: string
          end_time?: string
          is_booked?: boolean | null
          start_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      language: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      rating: {
        Row: {
          comment: string | null
          created_at: string | null
          rating_id: string
          reviewed_user_id: string
          reviewer_user_id: string
          session_id: string
          stars: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          rating_id?: string
          reviewed_user_id: string
          reviewer_user_id: string
          session_id: string
          stars: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          rating_id?: string
          reviewed_user_id?: string
          reviewer_user_id?: string
          session_id?: string
          stars?: number
        }
        Relationships: [
          {
            foreignKeyName: "rating_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_reviewer_user_id_fkey"
            columns: ["reviewer_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session"
            referencedColumns: ["session_id"]
          },
        ]
      }
      session: {
        Row: {
          advertisement_id: string
          created_at: string
          description: string | null
          end_time: string
          request_id: string | null
          session_id: string
          start_time: string
          status: Database["public"]["Enums"]["session_status"]
          student_user_id: string
          teacher_user_id: string
          updated_at: string
        }
        Insert: {
          advertisement_id: string
          created_at?: string
          description?: string | null
          end_time: string
          request_id?: string | null
          session_id?: string
          start_time: string
          status?: Database["public"]["Enums"]["session_status"]
          student_user_id: string
          teacher_user_id: string
          updated_at?: string
        }
        Update: {
          advertisement_id?: string
          created_at?: string
          description?: string | null
          end_time?: string
          request_id?: string | null
          session_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["session_status"]
          student_user_id?: string
          teacher_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisement"
            referencedColumns: ["advertisement_id"]
          },
          {
            foreignKeyName: "session_request_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "session_request"
            referencedColumns: ["session_request_id"]
          },
          {
            foreignKeyName: "session_student_fkey"
            columns: ["student_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_teacher_fkey"
            columns: ["teacher_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      session_request: {
        Row: {
          advertisement_id: string
          availability_id: string
          created_at: string
          description: string | null
          request_from_user_id: string
          request_to_user_id: string
          session_request_id: string
          status: Database["public"]["Enums"]["session_request_status"]
          updated_at: string
        }
        Insert: {
          advertisement_id: string
          availability_id: string
          created_at?: string
          description?: string | null
          request_from_user_id: string
          request_to_user_id: string
          session_request_id?: string
          status: Database["public"]["Enums"]["session_request_status"]
          updated_at?: string
        }
        Update: {
          advertisement_id?: string
          availability_id?: string
          created_at?: string
          description?: string | null
          request_from_user_id?: string
          request_to_user_id?: string
          session_request_id?: string
          status?: Database["public"]["Enums"]["session_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_request_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisement"
            referencedColumns: ["advertisement_id"]
          },
          {
            foreignKeyName: "session_request_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "availability"
            referencedColumns: ["availability_id"]
          },
          {
            foreignKeyName: "session_request_request_from_user_id_fkey"
            columns: ["request_from_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_request_request_to_user_id_fkey"
            columns: ["request_to_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          name: string
          skill_id: string
        }
        Insert: {
          name: string
          skill_id?: string
        }
        Update: {
          name?: string
          skill_id?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          email: string
          id: string
          name: string
          profile_image: string | null
        }
        Insert: {
          email: string
          id: string
          name?: string
          profile_image?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string
          profile_image?: string | null
        }
        Relationships: []
      }
      user_language: {
        Row: {
          language_id: string
          user_id: string
          user_language_id: string
        }
        Insert: {
          language_id: string
          user_id: string
          user_language_id?: string
        }
        Update: {
          language_id?: string
          user_id?: string
          user_language_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_language_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "language"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_language_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          skill_id: string
          user_id: string
          user_skill_id: string
        }
        Insert: {
          skill_id: string
          user_id: string
          user_skill_id?: string
        }
        Update: {
          skill_id?: string
          user_id?: string
          user_skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["skill_id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      advertisment_type: "offer" | "request"
      session_request_status: "pending" | "rejected" | "cancelled" | "accepted"
      session_status: "accepted" | "completed" | "cancelled"
      session_status__old_version_to_be_dropped:
        | "pending"
        | "accepted"
        | "rejected"
        | "cancelled"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      advertisment_type: ["offer", "request"],
      session_request_status: ["pending", "rejected", "cancelled", "accepted"],
      session_status: ["accepted", "completed", "cancelled"],
      session_status__old_version_to_be_dropped: [
        "pending",
        "accepted",
        "rejected",
        "cancelled",
        "completed",
      ],
    },
  },
} as const

