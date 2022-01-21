import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageHome } from "./pages/pageHome/PageHome";
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";

const ListCoinsPage = lazy(() =>
  import("./pages/PageCoins/PageCoins").then(({ PageCoins }) => ({
    default: PageCoins
  }))
);

const PageCoinDetail = lazy(() =>
  import("./pages/PageCoinDetail/PageCoinDetail").then(
    ({ PageCoinDetail }) => ({
      default: PageCoinDetail
    })
  )
);

const routerList = [
  { id: 1, path: "/", element: <PageHome /> },
  { id: 2, path: "/list-coins", element: <ListCoinsPage /> },
  { id: 3, path: "/list-coins/:coinId", element: <PageCoinDetail /> },
  { id: 4, path: "/*", element: <PageNotFound /> }
];

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routerList.map(({ id, path, element }) => (
          <Route key={id} path={path} element={element}></Route>
        ))}
      </Routes>
    </Suspense>
  );
};
