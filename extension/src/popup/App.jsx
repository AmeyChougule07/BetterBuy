import { useEffect, useState } from "react";

function App() {

  const [
    recommendations,
    setRecommendations
  ] = useState([]);

  useEffect(() => {

    chrome.storage.local.get(
      ["recommendations"],
      result => {

        setRecommendations(
          result.recommendations || []
        );

      }
    );

  }, []);

  return (
    <div>
      <h1>BetterBuy</h1>

      {recommendations.map(
        product => (
          <div key={product.name}>
            <h3>{product.name}</h3>
            <p>₹ {product.price}</p>
            <p>{product.cpu}</p>
            <p>⭐ {product.rating}</p>
          </div>
        )
      )}
    </div>
  );

}

export default App;