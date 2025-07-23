export const getStoragePathFromPublicUrl = (
  publicUrl: string,
): string | null => {
  const base = "/storage/v1/object/public/pictures/";
  const index = publicUrl.indexOf(base);
  if (index === -1) return null;
  return publicUrl.slice(index + base.length);
};
