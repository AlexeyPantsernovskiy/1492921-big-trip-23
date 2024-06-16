import { mockOffers } from '../mock/mock-data.js';

export default class OfferListModel {
  #offers = mockOffers;
  #items = {};

  constructor() {
    this.#offers.forEach((element) => {
      const offers = {};
      element.offers.forEach((offer) => {
        offers[offer.id] = offer;
      });
      this.#items[element.type] = offers;
    });
  }

  get items() {
    return this.#items;
  }

  getOffersForEventType(eventType) {
    if (this.#items && this.#items[eventType]) {
      return Object.values(this.#items[eventType]);
    }
    return [];
  }
}
