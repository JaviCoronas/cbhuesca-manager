import { supabase } from "../../../lib/supabase";

export interface Tournament {
  id: string;
  date: string;
  name: string;
  inscription: string;
  draw: string;
  location: string;
  category: string;
}

export async function getAllTournaments(): Promise<Tournament[] | null> {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error obteniendo los datos", error);
    return;
  }

  return data as Tournament[];
}