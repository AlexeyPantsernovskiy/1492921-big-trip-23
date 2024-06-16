const DateTimeFormats = {
  DATE_TIME_ISO: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DATE_ISO: 'YYYY-MM-DD',
  DAY_MONTH: 'DD MMM',
  MONTH_DAY: 'MMM DD',
  TIME: 'HH:mm',
};

const Folders = {
  ICON: 'img/icons/',
};

const BLANK_POINT = {
  type: 'Flight',
  destination: 'Paris',
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  price: 0,
  offers: [],
};

const HtmlClasses = {
  ROLLUP_BUTTON: 'event__rollup-btn',
  FAVORITE_BUTTON: 'event__favorite-btn',
  EVENT_TYPE: 'event__type-group',
  EVENT_DESTINATION: 'event__input--destination',
  EVENT_PRICE: 'event__input--price',
  EVENT_TIME: 'event__input--time',
  EVENT_OFFER: 'event__offer-checkbox',
};

const OFFER_ELEMENT_NAME_PREFIX = 'event-offer-';

const MAX_DESTINATION_IN_TRIP_INFO = 3;

const FilterItems = {
  EVERYTHING: {
    id: 'everything',
    name: 'Everything',
    emptyMessage: 'Click New Event to create your first point',
  },
  FUTURE: {
    id: 'future',
    name: 'Future',
    emptyMessage: 'There are no future events now',
  },
  PRESENT: {
    id: 'present',
    name: 'Present',
    emptyMessage: 'There are no present events now',
  },
  PAST: {
    id: 'past',
    name: 'Past',
    emptyMessage: 'There are no past events now',
  },
};
const INIT_FILTER_ITEM = FilterItems.EVERYTHING;

const SortingItems = {
  DAY: { id: 'day', name: 'Day', isCanSort: true },
  EVENT: { id: 'event', name: 'Event', isCanSort: false },
  TIME: { id: 'time', name: 'Time', isCanSort: true },
  PRICE: { id: 'price', name: 'Price', isCanSort: true },
  OFFERS: { id: 'offers', name: 'Offers', isCanSort: false },
};
const INIT_SORT_ITEM = SortingItems.DAY;

const IncludeBoundaries = {
  YES: true,
  NO: false,
};

export {
  BLANK_POINT,
  DateTimeFormats,
  Folders,
  HtmlClasses,
  MAX_DESTINATION_IN_TRIP_INFO,
  FilterItems,
  SortingItems,
  IncludeBoundaries,
  INIT_FILTER_ITEM,
  INIT_SORT_ITEM,
  OFFER_ELEMENT_NAME_PREFIX,
};
