1. Add the input and when you type=> the search api will be called and get the search result
2. Create a custom infinite scrolling component that can be used in any screen -> renderItem=> custom render function for the result
   list=> list of data to be rendered
   query => query string on chnage of which API getData will be called
   getData()- function calling the API
3. Use debounce to limit the number of API calls
4. Use AbortController to end the previous API call if the user changes the query
5. Add intersecion Observer for observing the End item of the rendered search result

// refs
let pageNumber = useRef(1);
let observer = useRef(null);
let lastElementObserver = useRef((node) => {
if (loading) return;
if (observer.current) observer.current.disconnect();
observer.current = new IntersectionObserver((entries) => {});
if (node) observer.current.observe();
});
useEffect(() => {
setLoading(true);
getData(query, pageNumber).finally(() => setLoading(false));
}, [query, getData]);
const renderList = () => {
return list.map((item, index) => renderItem(item, index, null));
};
#   I n f i n t e - s c r o l l  
 