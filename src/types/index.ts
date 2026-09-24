export interface PostItem {
  id?: number | string;
  slug?: string;
  title: string;
  body?: string;
  image?: string;
  category?: string;
  categoryLabel?: string;
  date?: string;
  icon?: string;
}

export interface MenuItem {
  id: number;
  linkText: string;
  link?: string;
  child?: boolean;
  icon?: string;
  new?: boolean;
  submenu?: {
    id: number;
    linkText: string;
    link?: string;
    child?: boolean;
    new?: boolean;
    third_menu?: {
      id: number;
      linkText: string;
      link: string;
    }[];
  }[];
}

export interface MatchItem {
  image: string;
  value: number;
  countries: string[];
  date: string;
  time: string;
}

export interface CategoryItem {
  small_img: string;
  big_image: string;
  title: string;
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel?: string;
  author?: string;
  authorName?: string;
  date: string;
  readTime?: number;
  image?: string;
  featured?: boolean;
  tags?: string[];
  views?: number;
  status?: string;
  articleMedia?: {
    heroCoverMedia?: { url?: string; poster?: string; vastTagUrl?: string };
    postBodyMedia?: { url?: string; poster?: string; vastTagUrl?: string };
    keyTakeawaysMedia?: { url?: string; poster?: string; vastTagUrl?: string };
    finalThoughtsMedia?: { url?: string; poster?: string; vastTagUrl?: string };
    vastAdSlotIds?: string[];
    [key: string]: unknown;
  };
  bodyContent?: string;
  keyTakeawaysContent?: string;
  finalThoughtsContent?: string;
  adOverrides?: unknown[];
  content_type?: string;
  seo_metadata?: Record<string, unknown>;
  locale?: string;
  [key: string]: unknown;
}

export interface Comment {
  id: string;
  articleSlug: string;
  authorName: string;
  content: string;
  rating: number;
  parentCommentId?: string | null;
  createdAt: string;
}

export interface Category {
  _id?: string;
  name?: string;
  slug: string;
  label?: string;
  locale?: string;
  parent?: string | null;
  meta?: {
    title?: string;
    description?: string;
  };
  color?: string;
  image?: string;
  count?: number;
  footerLabel?: string;
  latestImage?: string;
  [key: string]: unknown;
}
