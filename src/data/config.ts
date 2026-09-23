import { MenuItem } from '../types';

// Static site configuration — logos, banners, navigation menus
// All article/category data comes from JSON files → DB via lib/api.ts

export const logoLight = '/assets/logo-sXs-noO5.png';
export const logoDark = '/assets/logo-2-sokDn6Z8.png';
export const bannerTop = '/assets/banner-1-C4drpRxY.png';
export const bannerSidebar = '/assets/banner-2-zRgCfOgB.jpg';
export const bannerMiddle = '/assets/banner-1-C4drpRxY.png';

export const categoryIconDr =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAGCAYAAADUtS5UAAAABHNCSVQICAgIfAhkiAAAAFFJREFUKFNj/P///38G+oKHDAwMCYx0tPgjAwPDBEZGxgaQPxmp7VkcHtnIwMBQwMjI+ABmH60thgQrI+MBdA/SymKUYMUWqrSweAN6sGKzGACYcCJEAgyA4gAAAABJRU5ErkJggg==';

export const categoriesList = [
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-1-DT5nUGtE.jpg',
    title: 'Restaurant',
  },
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-2-XLCt1T80.jpg',
    title: 'Entertainment',
  },
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-3-bohyJLba.jpg',
    title: 'Feature',
  },
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-4-BqnrZn9-.jpg',
    title: 'Business',
  },
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-5-D2KEnFNQ.jpg',
    title: 'Trending',
  },
  {
    small_img: categoryIconDr,
    big_image: '/assets/categories-6-DcVLlW2a.jpg',
    title: 'Sports',
  },
];

export const menuData: MenuItem[] = [
  {
    id: 1,
    linkText: 'Home',
    child: true,
    icon: 'angle-down',
    submenu: [
      { id: 11, link: '/', linkText: 'Home 1' },
      { id: 12, link: '/dark', linkText: 'Home Dark' },
      { id: 13, new: true, link: '/home-two', linkText: 'Home 2' },
      { id: 14, link: '/home-three', linkText: 'Home 3' },
    ],
  },
  {
    id: 2,
    linkText: 'Pages',
    child: true,
    icon: 'angle-down',
    submenu: [
      { id: 21, link: '/about', linkText: 'About' },
      { id: 22, link: '/archive', linkText: 'Archive' },
      { id: 23, link: '/contact', linkText: 'Contact Us' },
      { id: 24, link: '/404', linkText: '404' },
    ],
  },
  {
    id: 3,
    linkText: 'Posts',
    child: true,
    icon: 'angle-down',
    submenu: [
      {
        id: 31,
        child: true,
        linkText: 'General Posts',
        third_menu: [
          { id: 311, link: '/', linkText: 'Post 1' },
          { id: 312, link: '/', linkText: 'Post 2' },
          { id: 313, link: '/', linkText: 'Post 3' },
        ],
      },
      {
        id: 32,
        child: true,
        linkText: 'Video Posts',
        third_menu: [
          { id: 321, link: '/', linkText: 'Video Style 1' },
          { id: 322, link: '/', linkText: 'Video Style 2' },
          { id: 323, link: '/', linkText: 'Video Style 3' },
        ],
      },
      {
        id: 33,
        child: true,
        linkText: 'Audio Posts',
        third_menu: [
          { id: 331, link: '/', linkText: 'Audio Style 1' },
          { id: 332, link: '/', linkText: 'Audio Style 2' },
          { id: 333, link: '/', linkText: 'Audio Style 3' },
        ],
      },
      {
        id: 34,
        child: true,
        linkText: 'Sidebars',
        third_menu: [
          { id: 341, link: '/', linkText: 'Right Sidebar' },
          { id: 342, link: '/', linkText: 'Left Sidebar' },
          { id: 343, link: '/', linkText: 'No Sidebar' },
        ],
      },
    ],
  },
  {
    id: 4,
    linkText: 'Categories',
    child: true,
    icon: 'angle-down',
    submenu: [
      { id: 41, link: '/business', linkText: 'Business' },
      { id: 42, link: '/entertainment', linkText: 'Entertainment' },
      { id: 43, link: '/features', linkText: 'Features' },
      { id: 44, link: '/sports', linkText: 'Sports' },
      { id: 45, link: '/trending', linkText: 'Trending' },
    ],
  },
  { id: 5, linkText: 'World', link: '/world' },
  { id: 6, linkText: 'Sports', link: '/sports' },
  { id: 7, linkText: 'Contact', link: '/contact' },
];

export const footerMenus = [
  { name: 'About', link: '/' },
  { name: 'Advertise', link: '/' },
  { name: 'Privacy & Policy', link: '/' },
  { name: 'Contact Us', link: '/' },
];

export const upcomingMatches = [
  {
    image: '/assets/match-01.png',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/match-02.png',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/match-03.png',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/match-04.png',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/match-05.png',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
];
