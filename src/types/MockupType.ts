export type MockupType = {
  mockup: {
    id?: string;
    username: string;
    name: string;
    posts: number;
    followers: number;
    following: number;
    bio: string;
    links: { url: string; id: string }[];
    type: string | null;
    avatar: string | null;
    images: string[];
    stories: { url: string; title: string }[];
  };
  assetsPreview: {
    avatar: null;
    images: [];
    stories: [];
  };
};
