import { UUID } from "crypto";

export type Mockup = {
  id?: UUID;
  username: string;
  name: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
  links: string;
  type: string;
  avatar: string | null;
  avatarFile: File | null;
};
