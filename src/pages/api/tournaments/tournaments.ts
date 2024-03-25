import { supabase } from "../../../lib/supabase";

export interface Tournament {
  id: string;
  date: string;
  name: string;
  inscription: string;
  draw: string;
  location: string;
  category: string;
  org: string;
}

export async function getAllTournaments(): Promise<Tournament[] | null> {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .eq("active", true)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error obteniendo los datos", error);
    return;
  }
  console.log("Tournaments data:", data);
  return data as Tournament[];
}
