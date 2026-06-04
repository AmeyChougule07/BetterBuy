console.log("BetterBuy Background Running");

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {

    if (message.type === "GET_RECOMMENDATIONS") {

      fetch("http://localhost:5000/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productData: message.productData,
          competitorProducts: message.competitorProducts
        })
      })
        .then(res => res.json())
        .then(data => {
          sendResponse(data);
        })
        .catch(error => {
          console.error(error);

          sendResponse({
            success: false,
            error: error.message
          });
        });

      return true;
    }
  }
);