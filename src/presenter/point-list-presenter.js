import { INIT_SORT_ITEM, SortingItems } from '@src/const.js';
import { render, RenderPosition } from '@framework/render.js';
import SortingView from '@view/sorting-view.js';
import PointListView from '@view/point-list-view.js';
import PointPresenter from '@presenter/point-presenter.js';
import dayjs from 'dayjs';

export default class PointListPresenter {
  #tripEventsContainer = null;
  #pointList = null;
  #eventTypeList = null;
  #destinationList = null;
  #offerList = null;

  #pointListView = new PointListView();
  #sortingView = null;

  #sourcedPoints = [];
  #shownPoints = [];

  #pointPresenters = new Map();

  constructor({
    tripEventsContainer,
    pointList,
    eventTypeList,
    destinationList,
    offerList,
  }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointList = pointList;
    this.#eventTypeList = eventTypeList;
    this.#destinationList = destinationList;
    this.#offerList = offerList;

    this.#pointList.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#sourcedPoints = [...this.#pointList.points];
    this.#shownPoints = [...this.#pointList.points];
    this.#renderPointList();
  }

  refreshPoints = (points = this.#shownPoints, sortId = INIT_SORT_ITEM.id) => {
    this.#clearPoints();
    if (points !== this.#shownPoints) {
      this.#shownPoints = [...points];
      this.#sortingView.activeSorting = sortId;
    }

    this.#sortPoints(sortId);
    this.#renderPoints();
  };

  #renderPointList() {
    this.#renderSorting();
    render(this.#pointListView, this.#tripEventsContainer);
    //this.renderPoints();
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    this.#shownPoints.forEach((point) => this.#renderPoint(point));
  }

  #updatePoint(points, point) {
    points[points.findIndex((item) => item.id === point.id)] = point;
  }

  #sortPoints(SortId) {
    switch (SortId) {
      case SortingItems.DAY.id:
        // Если с сервера всегда будут загружаться данные, отсортированные по времени, то можно не сортировать и просто брать исходный массив
        // this.#shownPoints = [...this.#sourcedPoints];
        // , но об этом в ТЗ ни чего не сказано, и поэтому сортируем всегда
        this.#shownPoints.sort((pointA, pointB) =>
          dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom)),
        );
        break;
      case SortingItems.TIME.id:
        this.#shownPoints.sort(
          (pointA, pointB) =>
            dayjs(pointB.dateTo) -
            dayjs(pointB.dateFrom) -
            (dayjs(pointA.dateTo) - dayjs(pointA.dateFrom)),
        );
        break;
      case SortingItems.PRICE.id:
        this.#shownPoints.sort(
          (pointA, pointB) =>
            pointB.price +
            pointB.offersCost -
            (pointA.price + pointA.offersCost),
        );
        break;
      default:
        throw new Error(`Передан неизвестный тип сортировки (id = ${SortId})!`);
    }
    //this.#currentSortType = sortType;
  }

  #renderSorting() {
    this.#sortingView = new SortingView({
      items: SortingItems,
      onSortingChange: this.#handleSortingChange,
    });

    render(
      this.#sortingView,
      this.#tripEventsContainer,
      RenderPosition.AFTERBEGIN,
    );
    this.#sortingView.setActiveItem = INIT_SORT_ITEM.id;
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#pointListView.element,
      eventTypeList: this.#eventTypeList,
      destinationList: this.#destinationList,
      offerList: this.#offerList,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /*
  #handlePointChange = (updatedPoint) => {
    this.#updatePoint(this.#shownPoints, updatedPoint);
    this.#updatePoint(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
*/

  #handleSortingChange = (sortId) => {
    this.refreshPoints(this.#shownPoints, sortId);
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };
}
