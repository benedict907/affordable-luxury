import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes/routes";
import PageNotFound from "./pages/PageNotFound";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="">
          <Suspense>
            <Routes>
              {routes.map((item) => (
                <Route
                  path={item.path}
                  element={item.element}
                  key={item.name}
                />
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
