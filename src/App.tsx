import { Layout } from "./common/components";
import { Navbar } from "./common/components";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Navbar />
            <main>
              <Router />
            </main>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
