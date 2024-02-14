import { supabase } from "../../lib/supabase";

export interface IGallery {
  id: string;
  created_at: string;
  date: string;
  name: string;
  inscription: string;
  draw: string;
  location: string;
  category: string;
  gallery_shared_folder: string;
  thumbnail: string;
}

export async function getAllImages(bucket: string): Promise<any[] | null> {
  const { data, error } = await supabase.storage.from(bucket).list("");

  if (error) {
    console.error("Error obteniendo los datos", error);
    return;
  }

  const imageUrls = data.map((file) => {
    return supabase.storage.from(bucket).getPublicUrl(file.name);
  });

  return imageUrls as any[];
}

export async function getAllGalleries(): Promise<IGallery[] | null> {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .not("gallery_shared_folder", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error obteniendo los datos", error);
    return;
  }

  return data as IGallery[];
}
