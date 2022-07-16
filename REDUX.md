https://codeburst.io/redux-a-crud-example-abb834d763c9
https://itnext.io/react-redux-api-loading-errors-e783972c5424
https://scotch.io/tutorials/build-a-media-library-with-react-redux-and-redux-saga-part-2
https://www.freecodecamp.org/news/login-using-react-redux-redux-saga-86b26c8180e/
https://flaviocopes.com/redux-saga/

# REDUX

is a state management library that gives you access to the state anywhere in your components without the need to pass props

## 1. Store

- The store is an object which has some methods in it that allows us to get the current state of our application, subscribe to changes or update the existing state of our application.

- Redux Store is great because now we don’t have to pass down data from the parent component to deeply nested child components through props. So anytime a component needs data it can ask the store and the store will provide it with the data

- The store that we created using the createStore method is an object which has some methods in it.
  One of those methods is called dispatch.
  This dispatch method accepts an object as it’s argument and this object is what we call as ‘action’.

**Syntax**

```
store.dispatch(action)
```

## 2. Action

- Actions are nothing but plain Javascript objects with a type property.
- This type property describes the event that is taking place in the application.
- This event can be anything from incrementing a counter to adding items in an array.
- An action can have any number of properties but it must have a type property.

**Syntax**
{
type: 'EVENT_NAME',
data/payload
}

**Ex**
{
type:'ADD_ITEM',
name: 'Redux'
}

## 3. Reducer

- is a function that takes the current state and an action that was dispatched as it’s parameters and returns the new state.
- how does the reducer go about producing the new state for the application. Well that is pretty simple, it first checks which type of action was dispatched and based on it returns the new state.

**Syntax**

```
const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      return state.concat([action.data]);
    default:
      return state;
  }
}
export default postReducer;
```

#### Recap

Flow ====== Store -> Dispatch Action -> Reducer return New State to the Store
|
Subscribe from Store to get data

The entire state of our application lives inside an object called the store. In order to update the state we need to dispatch an action. Actions are nothing but Javascript objects with a type property which describes the event taking place. Events can be anything from updating counters to adding posts like we have seen above. Once the action has been dispatched, it is received by the reducer. The reducer takes in the current state of the application and the dispatched action and produces the next state of the application based on action.type.

For our React application to use the Redux store, we use the Provider component provided by the react-redux library and put it as the root of all the components.
In order to access our Redux store within our React components we use the special connect() function. This function gives us access to dispatch and when we pass in mapStateToProps it gives us access to the state. mapStateToProps is a function that takes in the state of our application as a parameter and returns an object with keys of that object becoming the props of the component so that whenever we use this.props.key_name we get back the state we need.

- We need "dispatch" whenever we want to pass some action to the reducer to tell some sort of event has happened and then the reducer can decide what to do with the state.

- connect() returns a function which takes in your current component as an argument and returns a new component with dispatch method as it’s prop. The main idea to remember is that connect will ultimately return a new component which has the dispatch method as a prop.

**_Note_**
While an Action only describes what happened,
a Reducer describes how the application’s state changes.

**Syntax**

```
export default connect()(component-name)
```

- To get access to your state, we need to use a special function called mapStateToProps. This function does exactly what it is named, map the state from the store object to the props object in your components.
  Syntax:
  ```
  const mapStateToProps = (state) => {
    return {
      posts: state
    }
  }
  ```

React-Redux provides a React component called "Provider", which makes our application store available throughout our entire application.

React Redux provides a "Connect" function. We use this function whenever we want to “connect” a component to Redux, i.e. make a React component interact with our Redux store.

# Redux Saga

Reducers are the same for Redux Saga. This is simply a function that takes state and action as arguments, and returns the next state of the app

With Sagas, actions are slightly different. Three actions happen for each API call. Beginning the action, successful response, and error response.
