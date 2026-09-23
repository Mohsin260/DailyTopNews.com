import { CategoryItem, MatchItem, MenuItem, PostItem } from '../types';

export const logoLight = '/assets/logo-sXs-noO5.png';
export const logoDark = '/assets/logo-2-sokDn6Z8.png';
export const bannerTop = '/assets/banner-1-C4drpRxY.png';
export const bannerSidebar = '/assets/banner-2-zRgCfOgB.jpg';
export const bannerMiddle = '/assets/banner-1-C4drpRxY.png';
export const videoThumb = '/assets/video-post-thumb-Cx2wM747.jpg';

// Header menu configuration
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
          { id: 311, link: '/post1', linkText: 'Post 1' },
          { id: 312, link: '/post2', linkText: 'Post 2' },
          { id: 313, link: '/post3', linkText: 'Post 3' },
        ],
      },
      {
        id: 32,
        child: true,
        linkText: 'Video Posts',
        third_menu: [
          { id: 321, link: '/video_post1', linkText: 'Video Style 1' },
          { id: 322, link: '/video_post2', linkText: 'Video Style 2' },
          { id: 323, link: '/video_post3', linkText: 'Video Style 3' },
        ],
      },
      {
        id: 33,
        child: true,
        linkText: 'Audio Posts',
        third_menu: [
          { id: 331, link: '/audio_post1', linkText: 'Audio Style 1' },
          { id: 332, link: '/audio_post2', linkText: 'Audio Style 2' },
          { id: 333, link: '/audio_post3', linkText: 'Audio Style 3' },
        ],
      },
      {
        id: 34,
        child: true,
        linkText: 'Sidebars',
        third_menu: [
          { id: 341, link: '/post1', linkText: 'Right Sidebar' },
          { id: 342, link: '/left_post2', linkText: 'Left Sidebar' },
          { id: 343, link: '/post2', linkText: 'No Sidebar' },
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

// Top Trending Posts Carousel (below header)
export const topCarouselPosts: PostItem[] = [
  {
    title: 'The home decorations document: photograph of an',
    body: 'People have been infected',
    image: '/assets/post-1-BGjgFCDE.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-2-DhIV9LdM.jpg',
  },
  {
    title: 'Stimul package will transform the government fundamentally.',
    body: 'People have been infected',
    image: '/assets/post-3-DNXfgPMx.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-2-DhIV9LdM.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-1-BGjgFCDE.jpg',
  },
  {
    title: 'U.S. Response subash says he will label regions by risk of…',
    body: 'People have been infected',
    image: '/assets/post-3-DNXfgPMx.jpg',
  },
];

// Gallery / Hero Slider
export const heroGalleryPosts: PostItem[] = [
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Copa America: Luis Suarez from devastated US America',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Copa America: Luis Suarez from devastated US America',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-post-DydtzxC6.jpg',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
];

// Feature News Carousel
export const featureNewsPosts: PostItem[] = [
  {
    image: '/assets/feature-2-7m-7Q7T_.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Best garden wing supplies for the horticu ltural',
  },
  {
    image: '/assets/feature-3-DF8SppRb.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
  },
  {
    image: '/assets/feature-4-BVBUIQp3.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Best garden wing supplies for the horticu ltural',
  },
  {
    image: '/assets/feature-3-DF8SppRb.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
  },
  {
    image: '/assets/feature-4-BVBUIQp3.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Best garden wing supplies for the horticu ltural',
  },
  {
    image: '/assets/feature-3-DF8SppRb.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
  },
];

// Trending News Carousel (big cards)
export const trendingNewsCarousel: PostItem[] = [
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    image: '/assets/trending-news-1-g-OZNGif.jpg',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Japan’s virus success has puzzled the world. Is its luck running out?',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    image: '/assets/trending-news-2-ByY80RgJ.jpg',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
    image: '/assets/trending-news-1-g-OZNGif.jpg',
  },
];

// Trending News List (small cards)
export const trendingNewsList: PostItem[] = [
  {
    image: '/assets/gallery-1-z8qK02Z1.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy Zhang a Chinese busy woman and Dhaka',
  },
  {
    image: '/assets/gallery-2-BjL35jxX.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'U.S. Response subash says he will label regions by risk of…',
  },
  {
    image: '/assets/gallery-3-C5tFqJrq.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Venezuela elan govt and opposit the property collect',
  },
  {
    image: '/assets/gallery-4-BQgMsRpZ.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy Zhang a Chinese busy woman and Dhaka',
  },
  {
    image: '/assets/gallery-5-BO602hdN.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'U.S. Response subash says he will label regions by risk of…',
  },
  {
    image: '/assets/gallery-3-C5tFqJrq.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Venezuela elan govt and opposit the property collect',
  },
];

// Sidebar Tabbed Widget Posts (Related / Popular)
export const tabPosts: PostItem[] = [
  {
    image: '/assets/gallery-1-z8qK02Z1.jpg',
    title: 'Copa America: Luis Suarez from devastated US',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-2-BjL35jxX.jpg',
    title: 'Nancy Zhang a Chinese busy woman and Dhaka',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-3-C5tFqJrq.jpg',
    title: 'U.S. Response subash says he will label regions by risk of…',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-4-BQgMsRpZ.jpg',
    title: 'Venezuela elan govt and opposit the property collect',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
  {
    image: '/assets/gallery-5-BO602hdN.jpg',
    title: 'Cheap smartphone sensor could help you old food safe',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
  },
];

// Mix Area Carousel (Video & Audio Posts)
export const mixAreaPosts: PostItem[] = [
  {
    icon: 'play',
    image: '/assets/play-post-1-BAFOQlmJ.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Success is not a good food failure makes you humble',
  },
  {
    icon: 'bolt',
    image: '/assets/play-post-2-CbKX2VIt.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Success is not a good food failure makes you humble',
  },
  {
    icon: 'play',
    image: '/assets/play-post-1-BAFOQlmJ.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Success is not a good food failure makes you humble',
  },
  {
    icon: 'bolt',
    image: '/assets/play-post-2-CbKX2VIt.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Success is not a good food failure makes you humble',
  },
];

// Entertainment News Posts
export const entertainmentPosts: PostItem[] = [
  {
    image: '/assets/entertainment-1-Bdm3sQRr.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    image: '/assets/entertainment-2-ByWuhlVP.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    image: '/assets/entertainment-3-DYQO2kcn.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
  {
    image: '/assets/entertainment-4-gbxu3E2O.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'There may be no consoles in the future ea exec says',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower…',
  },
];

// Business News Posts
export const businessPosts: PostItem[] = [
  {
    image: '/assets/business-1-dUADSYDU.jpg',
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…',
  },
  {
    image: '/assets/business-2-Bz0OPE_t.jpg',
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…',
  },
  {
    image: '/assets/business-3-kEIW2e1c.jpg',
    category: 'uiux.subash',
    date: 'March 26, 2020',
    title: 'Copa America: Luis Suarez from devastated US',
    body: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with…',
  },
];

// Most View Widget Posts (Numbered 1-6)
export const mostViewPosts: PostItem[] = [
  {
    image: '/assets/most-1-DkifYVPw.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    image: '/assets/most-2-PQNAi08u.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The billionaire Philan thropist read to learn',
  },
  {
    image: '/assets/most-3-CtFQ4YBv.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Cheap smartphone sensor could help you',
  },
  {
    image: '/assets/most-4-K_aCG1V6.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Ratiffe to be Director of nation talent Trump',
  },
  {
    image: '/assets/most-5-jAtnr8fY.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    image: '/assets/most-1-DkifYVPw.jpg',
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The billionaire Philan thropist read to learn',
  },
];

// Most Share Posts (numbered 1-6)
export const mostSharePosts: PostItem[] = [
  {
    id: 1,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    id: 2,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Harbour amid a Slowen down in singer city',
  },
  {
    id: 3,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Cheap smartphone sensor could help you old food safe',
  },
  {
    id: 4,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The secret to moving this ancient sphinx screening',
  },
  {
    id: 5,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    id: 6,
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'The billionaire Philan thropist read to learn',
  },
];

// Upcoming Matches Widget
export const upcomingMatches: MatchItem[] = [
  {
    image: '/assets/item-1-qg6R-Vff.jpg',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/item-2-DzsAXLZt.jpg',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/item-3-CpAPLhPC.jpg',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/item-4-3vPPcrxq.jpg',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
  {
    image: '/assets/item-5-DaFAzTQ8.jpg',
    value: 30,
    countries: ['Germany', 'France'],
    date: 'Tomorrow',
    time: 'M22:30 (CST)',
  },
];

// Categories Widget
export const categoriesList: CategoryItem[] = [
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-1-DT5nUGtE.jpg',
    title: 'Restaurant',
  },
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-2-XLCt1T80.jpg',
    title: 'Entertainment',
  },
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-3-bohyJLba.jpg',
    title: 'Feature',
  },
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-4-BqnrZn9-.jpg',
    title: 'Business',
  },
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-5-D2KEnFNQ.jpg',
    title: 'Trending',
  },
  {
    small_img: '/assets/inner_bg-B2IPpk8O.jpg',
    big_image: '/assets/categories-6-DcVLlW2a.jpg',
    title: 'Sports',
  },
];

// Footer navigation menus
export const footerMenus = [
  { name: 'About', link: '/' },
  { name: 'Advertise', link: '/' },
  { name: 'Privacy & Policy', link: '/' },
  { name: 'Contact Us', link: '/' },
];
