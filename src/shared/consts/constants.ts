import {
  AlertOutlined,
  ApartmentOutlined,
  BarsOutlined,
  BookOutlined,
  DesktopOutlined,
  FrownOutlined,
  HeartOutlined,
  HeartTwoTone,
  PlaySquareOutlined,
  RadarChartOutlined,
  SmileOutlined,
  StarFilled,
  StarOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

export const iconComponents = {
  AlertOutlined,
  StarOutlined,
  DesktopOutlined,
  StarFilled,
  HeartTwoTone,
  BookOutlined,
  UsergroupAddOutlined,
  HeartOutlined,
  FrownOutlined,
  RadarChartOutlined,
  VideoCameraOutlined,
  PlaySquareOutlined,
  BarsOutlined,
  ApartmentOutlined,
  SmileOutlined,
};

export const FILMS_TOP_LIST = [
  {
    title: 'ТОП 100 популярных фильмов',
    icon: 'StarOutlined',
    url: '/popular',
    value: 'TOP_POPULAR_MOVIES',
  },
  {
    title: 'ТОП 250 лучших фильмов',
    icon: 'StarFilled',
    url: '/best',
    value: 'TOP_250_MOVIES',
  },
  {
    title: 'Вампиры',
    icon: 'HeartTwoTone',
    url: '/vampire',
    value: 'VAMPIRE_THEME',
  },
  {
    title: 'Комиксы',
    icon: 'BookOutlined',
    url: '/comics',
    value: 'COMICS_THEME',
  },
  {
    title: 'Семейный',
    icon: 'UsergroupAddOutlined',
    url: '/family',
    value: 'FAMILY',
  },
  {
    title: 'Романтика',
    icon: 'HeartOutlined',
    url: '/romantic',
    value: 'LOVE_THEME',
  },
  {
    title: 'Зомби',
    icon: 'FrownOutlined',
    url: '/zombie',
    value: 'ZOMBIE_THEME',
  },
  {
    title: 'Катастрофы',
    icon: 'AlertOutlined',
    url: '/catastrophe',
    value: 'CATASTROPHE_THEME',
  },
  {
    title: 'Популярные сериалы',
    icon: 'DesktopOutlined',
    url: '/popular-serials',
    value: 'POPULAR_SERIES',
  },
];

export const FILMS_LIST = [
  {
    title: 'Фильмы',
    icon: 'VideoCameraOutlined',
    url: '/films',
    value: 'FILM',
  },
  {
    title: 'Сериалы',
    icon: 'BarsOutlined',
    url: '/serials',
    value: 'TV_SERIES',
  },
  {
    title: 'Мультфильмы',
    icon: 'SmileOutlined',
    url: '/cartoons',
    value: 'FILM',
  },
];
