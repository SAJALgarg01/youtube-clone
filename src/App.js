import Body from "./components/Body";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Watch from "./components/Watch";
import Feed from "./components/Feed";
import SearchResult from"./components/SearchResult";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Body />,
//     children: [
//       {
//         path: "/",
//         element: <Feed />
//       },
//       {

//         path: "/watch",
//         element: <Watch />
//       },
//       {
//         path: "/SearchResult",
//         element: <SearchResult />
//       }
//     ]
//   }
// ])

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      {/* <RouterProvider router={appRouter} /> */}
      <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/searchResult" element={<SearchResult />} />
          </Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
