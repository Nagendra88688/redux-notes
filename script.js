// ********Actions in Redux ************

const BUY_CAKE = "BUY_CAKE";

//An actionCreator is a function that returns an action object

function buyCake() {
  //buyCake is an actionCreator
  return {
    //an action object being returned
    type: BUY_CAKE, //type is required in action object
    info: "redux tutorial", //extra data can be passed through action object
  };
}

// ******** Reducers **************
const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

// ****Responsibilities of a Redux store *****
const store = redux.createStore(reducer); //creating a redux store, it takes reducer as a parameter

const state = store.getState(); //accessing state from redux store

// to allow the app to subscribe to the changes happening in store
store.subscribe(() => console.log("updated state->", store.getState()));

//to dispatch an action
store.dispatch(buyCake()); //buyCake is a function(actionCreator) which returns action object
// OR
store.dispatch({
  type: "BUY_CAKE", //simply providing the action object
});

//to unsuscribe from the store, we call the function that is returned by the redux subscribe method
const unsubscribe = redux.subscribe(() =>
  console.log("updated state->", store.getState())
);
unsubscribe();

// ***** Combining and using multiple reducers ****
const combinedReducer = redux.combineReducers({
  cake: cakeReducer, //reducer 1
  iceCream: iceCreamReducer, //reducer 2
});
//this combined reducer will be then sent to redux.createStore function as an argument

//
//
//
//
//
//
//

// **** Implementing Redux with React with the help of react-redux package ***

import { Provider } from "react-redux"; //react-redux provides a component called provider

//wrap the provider around your main parent component and send your store as a prop to make it accessible anywhere
<Provider store={yourReduxStore}>
  <YourParentComponent />
</Provider>;
//
//
//
//
//
//********** Using redux state and dispatch in child component *****
import { connect } from "react-redux";
//we connect both mapStateToProps & mapDispatchToProps methods using 'connect' higher order func.

function CakeContainer({ numOfCakes, buyCake }) {
  //these 2 props are coming from 2 functions declared below
  return (
    <div>
      <h1>No. of Cakes - {numOfCakes}</h1>
      <button onClick={() => buyCake()}>Buy cake</button>
    </div>
  );
}

//to access the state from redux store, we create and use a mapStateToProps func that gets state as a parameter
const mapStateToProps = (state) => {
  return {
    numOfCakes: state.numOfCakes,
  };
};

//to access dispatch function, we create & use a mapDispatchToProps method that gets dispatch func as a parameter
const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer); //connecting while exporting

//react-redux with hooks can be utilized instead of using "connect" method
//
//the useSelector hook can do the work of mapStateToProps in an easy way
import { useSelector } from "react-redux";

//usage
const numOfCakes = useSelector((state) => state.numOfCakes);
//whatever returned from the callback func inside useSelector, will also be returned by useSelector itself

//Similarily, the useDispatch hook can do the work of mapDispatchToProps in an easy way
import { useDispatch } from "react-redux";

//usage
const dispatch = useDispatch();
//this dispatch func can then be used to dispatch an action in our child component

//with the help of above 2 hooks, now there is no need of connect function :)

//
//
//
//
//
//using 'redux-thunk' in react
import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
//just because of this thunkMiddleware, the actionCreator function(which we'll dispatch) can now
//return a function instead of just action object. This returned function can do sideEffects, like network calls.
