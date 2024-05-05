import {createElement} from '../render.js';
import {getDateISOString, getDateTimeISOString, getDurationTimeString, getMonthDayString, getTimeString} from '@utils/datetime.js';

const offersItemTemplate = ({name, price}) => `
  <li class="event__offer">
    <span class="event__offer-title">${name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

const offersTemplate = (items) => `
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${items.map((item) => offersItemTemplate(item)).join('')}
  </ul>
`;
const pointTemplate = ({eventType, destination, timeStart, timeEnd, price, offers, favorite}) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateISOString(timeStart)}">${getMonthDayString(timeStart)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateTimeISOString(timeStart)}">${getTimeString(timeStart)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateTimeISOString(timeEnd)}">${getTimeString(timeEnd)}</time>
        </p>
        <p class="event__duration">${getDurationTimeString(timeStart, timeEnd)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${offersTemplate(offers)}
      <button class="event__favorite-btn${favorite ? ' event__favorite-btn--active"' : '"'} type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;

export default class PointView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return pointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
