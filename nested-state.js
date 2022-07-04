const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const initialState = {
  name: "Vishwas",
  address: {
    street: "123 Main St",
    city: "Boston",
    status: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const streetUpdate = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case STREET_UPDATED:
//       return {
//         ...state,
//         address: {
//           ...state.address,
//           street: action.payload,
//         },
//       };
//     default:
//       return state;
//   }
// };

// immer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initialState", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(streetUpdate("456 Main St"));
unsubscribe();
