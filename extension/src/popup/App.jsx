import { useEffect, useState } from "react";

function App() {

const [
  loading,
  setLoading
] = useState(true);

const [
recommendations,
setRecommendations
] = useState([]);

const [
  currentProduct,
  setCurrentProduct
] = useState(null);

useEffect(() => {


chrome.storage.local.get(
  [
    "recommendations",
    "currentProduct"
  ],
  result => {

    setRecommendations(
      result.recommendations || []
    );

    setCurrentProduct(
      result.currentProduct || null
    );

    setLoading(false);

  }
);


}, []);

return (

<div
  style={{
    maxWidth: "420px",
    width: "100%",
    padding: "15px",
    boxSizing: "border-box"
  }}
>

  <h1>🛒 BetterBuy</h1>

  {loading ? (

    <div
      style={{
        textAlign: "left",
        padding: "10px"
      }}
    >
      <h3>
        🔄 Analyzing Product...
      </h3>

      <p>
        • Extracting Specs
      </p>

      <p>
        • Finding Alternatives
      </p>

      <p>
        • Ranking Recommendations
      </p>
    </div>

  ) : (

    <>

      {currentProduct && (

        <div
          style={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "15px",
            textAlign: "left"
          }}
        >

          <h3
            style={{
              marginTop: 0,
              color: "#4CAF50"
            }}
          >
            🎯 Current Product
          </h3>

          <p>
            💰 {currentProduct.price}
          </p>

          <p>
            🧠 {currentProduct.cpu}
          </p>

          <p>
            💾 {currentProduct.storage}
          </p>

          <p>
            ⭐ {currentProduct.rating}
          </p>

        </div>

      )}

      {recommendations.map(
        (product, index) => (

          <div
            key={product.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "8px"
            }}
          >

            {index === 0 && (
              <div
                style={{
                  background: "#FFD700",
                  color: "#000",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}
              >
                🥇 Best Match
              </div>
            )}

            {index === 1 && (
              <div
                style={{
                  background: "#C0C0C0",
                  color: "#000",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}
              >
                🥈 Runner Up
              </div>
            )}

            {index === 2 && (
              <div
                style={{
                  background: "#CD7F32",
                  color: "#000",
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}
              >
                🥉 Third Best
              </div>
            )}

            <h3
              style={{
                textAlign: "left",
                marginBottom: "12px"
              }}
            >
              {
                product.name.length > 70
                  ? `${product.name.slice(0, 70)}...`
                  : product.name
              }
            </h3>

            <p style={{ textAlign: "left" }}>
              💰 {product.price}
            </p>

            <p style={{ textAlign: "left" }}>
              🧠 {product.cpu}
            </p>

            <p style={{ textAlign: "left" }}>
              ⭐ {product.rating ?? "No rating available"}
            </p>

            {product.reasons?.length > 0 && (

              <div
                style={{
                  marginTop: "10px",
                  borderTop: "1px solid #eee",
                  paddingTop: "8px"
                }}
              >

                <strong>
                  Why BetterBuy recommends this:
                </strong>

                {product.reasons.map(
                  reason => (

                    <p
                      key={reason}
                      style={{
                        color: "#4CAF50",
                        margin: "4px 0"
                      }}
                    >
                      ✓ {reason}
                    </p>

                  )
                )}

              </div>

            )}

          </div>

        )
      )}

    </>

  )}

</div>

);

}

export default App;
