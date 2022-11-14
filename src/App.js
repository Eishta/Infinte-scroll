import { useCallback, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";

export default function App() {
  const controllerRef = useRef(); // to keep a abort controller to abort the previous api call
  // normal states to maintain the query and the list data
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  // function that will call the fetch api and returns the Promise
  const getData = useCallback(() => {
    return new Promise(async (res, rej) => {
      try {
        // abort the previous API call
        if (controllerRef.current) controllerRef.current.abort();
        // create a new controller
        controllerRef.current = new AbortController();
        // fetch the data
        let promise = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controllerRef.current.signal }
        );
        let list = await promise.json();
        // append the res to the prev list
        setData((prev) => [...prev, ...list]);
        res();
      } catch (e) {
        rej(e);
      }
    });
  }, [query]);

  // function to handle the query
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // useCallback is used to avoid the creation of a new function on each render
  // render props pattern to give the function for custom rendering of the listitems
  const renderItem = useCallback(
    (title, key, ref) => (
      <div
        key={key}
        ref={ref}
        style={{ fontSize: "2rem", margin: "2rem", padding: "2rem" }}
      >
        {title}
      </div>
    ),
    []
  );

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      <InfiniteScroll
        getData={getData}
        list={data}
        query={query}
        renderItem={renderItem}
      />
    </div>
  );
}
