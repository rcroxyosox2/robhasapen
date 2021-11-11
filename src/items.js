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
      btc: 0.002,
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
      usd: 50,
      btc: 0.002,
    },
    size: {
      w: 18,
      h: 24,
    }
  },

  {
    key: 'woodenhorse',
    title: 'Wooden Horse',
    img: woodenHorseImg,
    price: {
      usd: 50,
      btc: 0.002,
    },
    size: {
      w: 18,
      h: 24,
    }
  },

  {
    key: 'graylady',
    title: 'Gray Lady',
    img: grayLadyImg,
    price: {
      usd: 50,
      btc: 0.002,
    },
    size: {
      w: 18,
      h: 24,
    }
  }
];

const getItemByKey = (key) => items.find((item) => item.key === key);
const getSizeFromItem = (item) => `${item.size.w}x${item.size.h}in`
export { getItemByKey, getSizeFromItem };
export default items;