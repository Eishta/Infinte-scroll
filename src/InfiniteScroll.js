const { useEffect, useState, useRef, useCallback } = require("react");

const InfiniteScroll = (props) => {
  // destructure the props
  let { list, query, renderItem, getData } = props;
  // check the loading
  const [loading, setLoading] = useState(false);
  // pagenumber is stored in ref bcz teh 
  const pagenumber = useRef(1);
  const observer = useRef(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    getData(query).finally(() => {
      setLoading(false);
    });
  }, [query]);
  const lastElementRef = useCallback((node) => {
    
    if (loading) return;
    // if there is an observer already - disconnect it 
    if (observer.current) observer.current.disconnect();
    // create a new observer for the new last element
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // if the last element is reached increase the page number and fetch again the data
        pagenumber.current += 1;
        fetchData();
      }
    });
    // observe the node
    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    console.log("Loading" + loading);
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, [query]);

  const renderList = () => {
    return list.map((ele, index) => {
      if (index === list.length - 1)
      // if it is the last element, send the ref 
        return renderItem(ele.name, index, lastElementRef);
      else return renderItem(ele.name, index, null);
    });
  };
  return (
    <div>
      <h1>{pagenumber.current}</h1>
      {renderList()}
      {loading && "LOADING"}
    </div>
  );
};

export default InfiniteScroll;
