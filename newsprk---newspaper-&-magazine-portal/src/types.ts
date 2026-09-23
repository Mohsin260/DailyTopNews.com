export interface PostItem {
  id?: number | string;
  title: string;
  body?: string;
  image?: string;
  category?: string;
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
