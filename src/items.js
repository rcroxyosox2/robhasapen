import dumbGunsImg from './images/items/dumbguns.jpg';
import oldWorldCowboyImg from './images/items/oldworldcowboy.jpg';
import woodenHorseImg from './images/items/woodenhorse.jpg';
import grayLadyImg from './images/items/graylady.jpg';

const items = [
  {
    key: 'dumbguns',
    title: 'Dumb Guns',
    img: dumbGunsImg,
    price: {
      usd: 200,
    },
    size: {
      w: 18,
      h: 24,
    },
    media: 'acrylic on canvas',
  },

  {
    key: 'oldworldcowboy',
    title: 'Old World Cowboy',
    img: oldWorldCowboyImg,
    price: {
      usd: 80,
    },
    size: {
      w: 11,
      h: 14,
    },
    media: 'acrylic & spraypaint on canvas',
  },

  {
    key: 'woodenhorse',
    title: 'Wooden Horse',
    img: woodenHorseImg,
    price: {
      usd: 200,
    },
    size: {
      w: 18,
      h: 24,
    },
    media: 'acrylic on canvas',
  },

  {
    key: 'graylady',
    title: 'Gray Lady',
    img: grayLadyImg,
    price: {
      usd: 80,
    },
    size: {
      w: 11,
      h: 14,
    },
    media: 'acrylic & spraypaint on canvas',
  }
];

const getItemByKey = (key) => items.find((item) => item.key === key);
const getSizeFromItem = (item) => `${item.size.w}x${item.size.h}`
export { getItemByKey, getSizeFromItem };
export default items;