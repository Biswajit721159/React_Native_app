/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import { Provider } from 'react-redux/es/exports';
// import store from './component/Rudex/Store';

// console.log(store)

// const  appReducer =() =>
// (
//     <Provider store={store}>
//         <App/>
//     </Provider>
// )

AppRegistry.registerComponent(appName, () => App);
