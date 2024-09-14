import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Toaster } from 'react-hot-toast';

let persistor = persistStore(store);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <BrowserRouter>
        <App />
        <Toaster />

      </BrowserRouter>
    </PersistGate>

  </Provider>,
)
