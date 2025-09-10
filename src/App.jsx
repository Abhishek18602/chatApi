import React from "react";
import markdownit from "markdown-it";
import useSWR from "swr";

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState("default");
  const inputText = React.useRef(null);
  const md = markdownit();

  const fetcherFunc = async (promptText) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:9090/api/chat", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
        }),
        method: "post",
      });

      const jsonData = md.render(await response.text());
      setData(jsonData);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  //   React.useEffect(() => {

  //   }, []);

  return loading ? (
    <>Loading</>
  ) : (
    <>
      <input ref={inputText} type="text" placeholder="Enter a prompt ..." />
      <button
        onClick={() => {
          fetcherFunc(inputText?.current?.value);
        }}
      >
        Ask
      </button>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </>
  );
};

export default App;
