import { getRandomArrayElements, getRandomInt } from '@utils/random.js';

const [MIN_COUNT_SENTENCES, MAX_COUNT_SENTENCES] = [1, 5];
const [MIN_RANDOM_PICTURE, MAX_RANDOM_PICTURE] = [1, 500];
const [MIN_COUNT_PICTURES, MAX_COUNT_PICTURES] = [0, 3];
const MIN_COUNT_POINTS = 3;

const RANDOM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const URL_PICTURES = 'https://loremflickr.com/248/152?random=';

const getRandomDescription = () => {
  const count = getRandomInt(MIN_COUNT_SENTENCES, MAX_COUNT_SENTENCES);
  const sentences = RANDOM_TEXT.split('. ');
  return getRandomArrayElements(sentences, count).join('. ');
};

const getRandomPicture = () =>
  `${URL_PICTURES}${getRandomInt(MIN_RANDOM_PICTURE, MAX_RANDOM_PICTURE)}`;

const getRandomPictures = () => {
  const count = getRandomInt(MIN_COUNT_PICTURES, MAX_COUNT_PICTURES);
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      src: getRandomPicture(),
      description: getRandomDescription(),
    });
  }
  return result;
};

const eventTypeItems = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const destinationItems = [
  {
    id: 'Amsterdam',
    name: 'Amsterdam',
    description:
      "Amsterdam's main attractions include its historic canals; the Rijksmuseum, the state museum with Dutch Golden Age art; the Van Gogh Museum; the Dam Square, where the Royal Palace of Amsterdam and former city hall are located; the Amsterdam Museum; Stedelijk Museum, with modern art; the Concertgebouw concert hall; the Anne Frank House; the Scheepvaartmuseum, the Natura Artis Magistra; Hortus Botanicus, NEMO, the red-light district and cannabis coffee shops.",
    pictures: getRandomPictures(),
  },
  {
    id: 'Geneva',
    name: 'Geneva',
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    pictures: getRandomPictures(),
  },
  {
    id: 'Paris',
    name: 'Paris',
    description:
      'Paris is the capital and most populous city France. Paris is especially known for its museums and architectural landmarks: the Louvre received 8.9 million visitors in 2023, on track for keeping its position as the most-visited art museum in the world.',
    pictures: getRandomPictures(),
  },
  {
    id: 'Chamonix',
    name: 'Chamonix',
    description:
      "Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",
  },
];

const offerItems = [
  { id: 'luggage-1', name: 'Add luggage', price: 50 },
  { id: 'comfort-1', name: 'Switch to comfort', price: 80 },
  { id: 'meal-1', name: 'Add meal', price: 15 },
  { id: 'seats-1', name: 'Choose seats', price: 5 },
  { id: 'train-1', name: 'Travel by train', price: 40 },
  { id: 'uber-1', name: 'Order Uber', price: 20 },
  { id: 'car-1', name: 'Rent a car', price: 200 },
  { id: 'breakfast-1', name: 'Add breakfast', price: 50 },
  { id: 'tickets-1', name: 'Book tickets', price: 40 },
  { id: 'lunch-1', name: 'Lunch in city', price: 30 },
  { id: 'business-1', name: 'Upgrade to a business class', price: 120 },
];

const eventTypeOffers = [
  { type: 'Taxi', offers: ['uber-1', 'business-1'] },
  { type: 'Train', offers: ['luggage-1', 'meal-1'] },
  { type: 'Ship', offers: ['luggage-1', 'comfort-1', 'meal-1'] },
  { type: 'Drive', offers: ['car-1'] },
  {
    type: 'Flight',
    offers: ['luggage-1', 'comfort-1', 'meal-1', 'seats-1', 'train-1'],
  },
  { type: 'Check-in', offers: ['breakfast-1'] },
  { type: 'Sightseeing', offers: ['tickets-1', 'lunch-1'] },
];

const getRandomOffers = (eventType) => {
  const typeOffers = eventTypeOffers.find(
    (element) => element.type === eventType,
  );
  if (typeOffers) {
    const offers = typeOffers.offers;
    if (offers) {
      return getRandomArrayElements(offers, getRandomInt(0, offers.length));
    }
  }
  return [];
};

const pointItems = [
  {
    id: '1',
    type: 'Taxi',
    destination: 'Amsterdam',
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    price: 20,
    offers: getRandomOffers('Taxi'),
    isFavorite: true,
  },
  {
    id: '2',
    type: 'Drive',
    destination: 'Chamonix',
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    price: 160,
    offers: getRandomOffers('Drive'),
    isFavorite: true,
  },
  {
    id: '3',
    type: 'Flight',
    destination: 'Geneva',
    dateFrom: '2019-03-19T18:00',
    dateTo: '2019-03-19T19:00',
    price: 20,
    offers: getRandomOffers('Flight'),
    isFavorite: false,
  },
  {
    id: '4',
    type: 'Sightseeing',
    destination: 'Geneva',
    dateFrom: '2019-03-20T11:15',
    dateTo: '2019-03-20T12:15',
    price: 180,
    offers: getRandomOffers('Sightseeing'),
    isFavorite: false,
  },
  {
    id: '5',
    type: 'Train',
    destination: 'Paris',
    dateFrom: '2019-03-21T08:00',
    dateTo: '2019-03-22T14:15',
    price: 360,
    offers: getRandomOffers('Train'),
    isFavorite: false,
  },
  {
    id: '6',
    type: 'Bus',
    destination: 'Paris',
    dateFrom: '2019-03-22T15:00',
    dateTo: '2019-03-22T15:30',
    price: 5,
    offers: getRandomOffers('Bus'),
    isFavorite: false,
  },
  {
    id: '7',
    type: 'Check-in',
    destination: 'Paris',
    dateFrom: '2019-03-22T15:40',
    dateTo: '2019-03-23T12:00',
    price: 500,
    offers: getRandomOffers('Bus'),
    isFavorite: true,
  },
];

const getRandomPoints = () =>
  getRandomArrayElements(
    pointItems,
    getRandomInt(MIN_COUNT_POINTS, pointItems.length),
  ).sort((a, b) => {
    if (a.dateFrom < b.dateFrom) {
      return -1;
    }
    if (a.dateFrom > b.dateFrom) {
      return 1;
    }
    return 0;
  });

export {
  pointItems,
  eventTypeItems,
  destinationItems,
  offerItems,
  eventTypeOffers,
  getRandomPoints,
};
