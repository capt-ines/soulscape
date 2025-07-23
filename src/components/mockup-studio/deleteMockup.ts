import { Mockup } from "@/types/Mockup";
import { getStoragePathFromPublicUrl } from "@/utils/getStoragePathFromPublicUrl";
import { createClient } from "@/utils/supabase/client";

import { deleteAssetsFromStorage } from "./deleteAssetsFromStorage";

export const deleteMockup = async (mockup: Mockup) => {
  const supabase = await createClient();
  const avatarPath = mockup.avatar
    ? getStoragePathFromPublicUrl(mockup.avatar)
    : null;
  const imagesPaths = mockup.images.map((image) =>
    getStoragePathFromPublicUrl(image),
  );
  const storiesPaths = mockup.stories.map((story) =>
    getStoragePathFromPublicUrl(story.url),
  );

  const deletedAssetsFiles = {
    avatar: avatarPath,
    images: imagesPaths,
    stories: storiesPaths,
  };
  await deleteAssetsFromStorage(deletedAssetsFiles);
  await supabase.from("mockups").delete().eq("id", mockup.id);
};
