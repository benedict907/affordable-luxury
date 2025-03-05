import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import routes from "./routes/routes";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {routes.map((item) => (
            <Route path={item.path} element={item.element} key={item.name} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
