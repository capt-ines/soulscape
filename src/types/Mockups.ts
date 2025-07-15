import { UUID } from "crypto";

export type Mockup = {
  id?: UUID;
  username: string;
  name: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  links: { name: string; id: string }[];
  type: string;
  avatar: string | null;
  images: string[];
};
