import './App.css';
import MainApp from './Components/MainApp';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainApp/>  
      </Provider>
    </div>
  );
}

export default App;
