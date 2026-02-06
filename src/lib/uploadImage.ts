import { supabase } from "./supabase";
import { toast } from "sonner";

/**
 * Uploads an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @returns The public URL of the uploaded image, or null if upload fails
 */
export async function uploadImage(
    file: File,
    bucket: string = "images"
): Promise<string | null> {
    try {
        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            toast.error("Please upload a valid image file (JPG, PNG, WebP, or GIF)");
            return null;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            toast.error("Image size must be less than 5MB");
            return null;
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image: " + error.message);
            return null;
        }

        // Get public URL
        const { data: publicData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicData.publicUrl;
    } catch (error) {
        console.error("Upload error:", error);
        toast.error("An unexpected error occurred during upload");
        return null;
    }
}
