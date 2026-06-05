console.log("BetterBuy Background Running");

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {

    if (
      message.type ===
      "GET_RECOMMENDATIONS"
    ) {

      fetch(
        "http://localhost:5000/api/recommendations",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            productData:
              message.productData,

            competitorProducts:
              message.competitorProducts
          })
        }
      )

        .then(async res => {

          const text =
            await res.text();

          console.log(
            "===== BACKEND RESPONSE ====="
          );

          console.log(text);

          try {

            const data =
              JSON.parse(text);

            sendResponse(data);

          } catch (err) {

            console.error(
              "Response is NOT JSON"
            );

            console.error(text);

            sendResponse({
              success: false,
              error:
                "Backend returned non-JSON response",
              rawResponse: text
            });

          }

        })

        .catch(error => {

          console.error(
            "Fetch Error:"
          );

          console.error(error);

          sendResponse({
            success: false,
            error:
              error.message
          });

        });

      return true;
    }
  }
);