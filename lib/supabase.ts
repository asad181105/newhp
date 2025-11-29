import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase credentials not configured.");
}

export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  query: string;
  agentName: string;
}

export async function saveToSupabase(data: FormSubmission): Promise<void> {
  if (!supabase) {
    console.warn("Supabase not configured. Skipping database save.");
    return;
  }

  try {
    const { error } = await supabase.from("form_submissions").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        query: data.query,
        agent_name: data.agentName,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    throw error;
  }
}

export async function getSubmissions() {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }

  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}

