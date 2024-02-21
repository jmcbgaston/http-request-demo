document.addEventListener("DOMContentLoaded", () => {
  // *** QUERY ELEMENTS ***
  const getButton = document.querySelector(".get-req > button");
  const submitButton = document.querySelector(".post-req > button");
  const updateButton = document.querySelector(".patch-req > button");
  const deleteButton = document.querySelector(".delete-req > button");
  // const externalApiButton = document.querySelector(".external-api > button");

  const getMessage = document.querySelector(".get-req > .message");
  const submitMessage = document.querySelector(".post-req > .message");
  const updateMessage = document.querySelector(".patch-req > .message");
  const deleteMessage = document.querySelector(".delete-req > .message");
  // const externalApiMessage = document.querySelector(".external-api > .message");
  // *** *** *** ***

  // *** EVENT HANDLERS ***
  getButton.addEventListener("click", () => getText());
  submitButton.addEventListener("click", () => postText());
  updateButton.addEventListener("click", () => patchText());
  deleteButton.addEventListener("click", () => deleteText());
  // externalApiButton.addEventListener("click", () => callFakeApi());
  // *** *** *** ***

  function displayTimedMessage(element, message, reqStatus) {
    reqStatus === "success"
      ? (element.style["color"] = "green")
      : (element.style["color"] = "red");

    element.style["visibility"] = "visible";
    element.textContent = message;
    setTimeout(() => {
      element.style["visibility"] = "hidden";
      element.textContent = "";
    }, 5000);
  }

  // *** API ***
  async function getText() {
    const spanText = document.querySelector(".get-req > p > span");
    try {
      const response = await axios.get("/get-text");

      spanText.textContent = response.data.storedText;

      displayTimedMessage(getMessage, "Data successfully fetched", "success");
    } catch (error) {
      displayTimedMessage(getMessage, error, "error");
    }
  }

  async function postText() {
    const inputValue = document.querySelector(".post-req > input").value;
    try {
      await axios.post("/post-text", { inputValue });

      storedText = inputValue;

      displayTimedMessage(submitMessage, "Data successfully posted", "success");
    } catch (error) {
      displayTimedMessage(submitMessage, error, "error");
    }
  }

  async function patchText() {
    const inputValue = document.querySelector(".patch-req > input").value;
    try {
      await axios.patch("/patch-text", { inputValue });

      storedText = inputValue;

      displayTimedMessage(
        updateMessage,
        "Data successfully patched",
        "success"
      );
    } catch (error) {
      displayTimedMessage(updateMessage, error, "error");
    }
  }

  async function deleteText() {
    const spanText = document.querySelector(".get-req > p > span");
    try {
      const response = await axios.delete("/delete-text");

      spanText.textContent = response.data.storedText;

      displayTimedMessage(
        deleteMessage,
        "Data successfully deleted",
        "success"
      );
    } catch (error) {
      displayTimedMessage(deleteMessage, error, "error");
    }
  }

  // async function callFakeApi() {
  //   await fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }

  // async function callFakeApi() {
  //   let url1 = "https://pokeapi.co/api/v2/pokemon?limit=150";
  //   let url2 = "https://jsonplaceholder.typicode.com/todos/1";

  //   try {
  //     const responses = await Promise.all([fetch(url1), fetch(url2)]);
  //     const jsonResponses = await Promise.all(
  //       responses.map((response) => response.json())
  //     );

  //     console.log(jsonResponses);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  // *** *** *** ***
});
