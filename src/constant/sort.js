export const SORT_OBJECT = {
  popularity: {
    value: "popularity",
    name: " Most Popular",
    queryObj: { orderby: undefined, order: undefined },
  },
  pricelow: {
    value: "pricelow",
    name: "Price Low to High",
    queryObj: { orderby: "price", order: 1 },
  },
  pricehight: {
    value: "pricehight",
    name: "Price Hight to Low",
    queryObj: { orderby: "price", order: -1 },
  },
  newest: {
    value: "newest",
    name: "Newest",
    queryObj: { orderby: "createdAt", order: -1 },
  },
  rating: {
    value: "rating",
    name: "Most Rated",
    queryObj: { orderby: "rating", order: -1 },
  },
};
