export type GenreType = {
  id?: number;
  name?: string;
};

export type UserType = {
  id?: number;
  email?: string;
  password?: string;
};

export type ContentType = {
  backdrop_url?: string;
  genres?: GenreType[];
  name?: string;
  overview?: string;
  poster_url?: string;
  tagline?: string;
  uri?: string;
};

export type ReviewType = {
  body?: string;
  content?: ContentType;
  content_uri?: string;
  created_at?: string;
  id?: number;
  user?: UserType;
  user_id?: number;
};
