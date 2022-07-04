const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
//   anotherProperty: 0,
// };

// const reducer = (state = initialState, action) => {
//       switch (action.type) {
//         case CAKE_ORDERED:
//           return {
//             ...state,
//             numOfCakes: state.numOfCakes - 1,
//           };
//         case CAKE_RESTOCKED:
//           return {
//             ...state,
//             numOfCakes: state.numOfCakes + action.payload,
//           };
//         case ICECREAM_ORDERED:
//           return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - action.payload,
//           };
//         case ICECREAM_RESTOCKED:
//           return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams + action.payload,
//           };
//         default:
//           return state;
//       }
//     };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  cakeReducer,
  iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

// const store = createStore(reducer);

// getState는 store값을 가져옴
console.log(store.getState());

// subscribe는 store값이 바뀔때 실행
// unsubscribe는 리스너
const unsubscribe = store.subscribe(
  () =>
    // logger가 있기 대문에 console.log를 없앰
    {}
  //   console.log("Updated States", store.getState())
);

// action들을 객체 파라미터로 받아서 store.dispatch로 처리
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream(2);
actions.restockIceCream(3);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

unsubscribe();
