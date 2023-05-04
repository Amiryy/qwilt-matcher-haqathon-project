export interface CategoryType {
  name: string;
  activities: ActivityType[];
}

export interface ActivityType {
  name: string;
  specifics?: string[];
}

export interface SlackChannelType {
  id?: string;
  name: string;
}

export interface TempUserType {
  firstName: string;
  lastName: string;
  email: string;
}

export const categories: CategoryType[] = [
  {
    name: 'Sports and Fitness',
    activities: [
      { name: 'Basketball' },
      { name: 'Soccer' },
      { name: 'Tennis' },
      { name: 'Swimming' },
      { name: 'Ping pong' },
      { name: 'Yoga' },
      { name: 'Pilates' },
      { name: 'Weightlifting' },
      { name: 'Running' },
      { name: 'Cycling' },
    ],
  },
  {
    name: 'Arts and crafts',
    activities: [],
  },
  {
    name: 'Music',
    activities: [
      { name: 'Playing an instrument' },
      { name: 'Singing' },
      { name: 'Attending concerts' },
      { name: 'DJs' },
    ],
  },
  {
    name: 'Reading and writing',
    activities: [],
  },
  {
    name: 'Foodies',
    activities: [
      { name: 'Cooking and Baking' },
      { name: 'Carnivores' },
      { name: 'Wine' },
      { name: 'Restaurant reviews' },
      { name: 'Beer' },
    ],
  },
  {
    name: 'Gardening',
    activities: [],
  },
  {
    name: 'Photography',
    activities: [],
  },
  {
    name: 'Travel, Hiking and Camping',
    activities: [],
  },
  {
    name: 'Gaming',
    activities: [
      { name: 'Video games' },
      { name: 'Board & Card games' },
      { name: 'Chess' },
    ],
  },
  {
    name: 'Volunteering',
    activities: [],
  },
  {
    name: 'DIY projects',
    activities: [],
  },
  {
    name: 'Learning new languages',
    activities: [
      { name: 'French' },
      { name: 'Spanish' },
      { name: 'Mandarin' },
      { name: 'German' },
      { name: 'Italian' },
      { name: 'Hebrew' },
    ],
  },
  {
    name: 'Meditation and mindfulness',
    activities: [],
  },
  {
    name: 'Astronomy',
    activities: [],
  },
];
