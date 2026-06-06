console.log("BetterBuy Background Running");

chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {

    if (
      message.type ===
      "GET_RECOMMENDATIONS"
    ) {

      // =========================
      // DEBUG LOGGING
      // =========================

      console.log(
        "===== BACKGROUND RECEIVED ====="
      );

      console.log(
        JSON.stringify(
          message.productData,
          null,
          2
        )
      );

      console.log(
        "Competitors Count:",
        message.competitorProducts?.length || 0
      );

      // =========================
      // VALIDATION
      // =========================

      if (
        !message.productData ||
        !message.productData.title
      ) {

        console.error(
          "Invalid product data received from content script"
        );

        sendResponse({
          success: false,
          error:
            "Missing product title"
        });

        return true;
      }

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