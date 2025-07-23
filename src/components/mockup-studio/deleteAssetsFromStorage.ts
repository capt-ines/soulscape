import { createClient } from "@/utils/supabase/client";

export const deleteAssetsFromStorage = async (deletedAssetsFiles: {
  avatar: "";
  images: [];
  stories: [];
}) => {
  const supabase = await createClient();
  const BUCKET_NAME = "pictures";

  for (const [folder, fileOrFiles] of Object.entries(deletedAssetsFiles)) {
    const filePaths =
      typeof fileOrFiles === "string"
        ? [fileOrFiles]
        : Array.isArray(fileOrFiles)
          ? fileOrFiles
          : [];

    if (!filePaths.length) continue;

    try {
      await supabase.storage.from(BUCKET_NAME).remove(filePaths);
    } catch (err) {
      console.error(`Error while deleting ${folder}:`, err);
    }
  }
};
