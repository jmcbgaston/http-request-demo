// This will act as the API layer
// aka: a place for http request services
document.addEventListener("DOMContentLoaded", () => {
  // Query buttons
  const getButton = document.querySelector(".get-req > button");
  const submitButton = document.querySelector(".post-req > button");
  const updateButton = document.querySelector(".patch-req > button");
  const deleteButton = document.querySelector(".delete-req > button");

  // Add click events
  getButton.addEventListener("click", () => getText());
  submitButton.addEventListener("click", () => postText());
  updateButton.addEventListener("click", () => patchText());
  deleteButton.addEventListener("click", () => deleteText());

  // Functions
  async function getText() {
    const spanText = document.querySelector(".get-req > p > span");
    try {
      const response = await axios.get("/get-text");
      console.log({ axiosGET: response.data });

      spanText.textContent = response.data.storedText;
    } catch (error) {
      console.log({ error });
    }
  }

  async function postText() {
    const inputValue = document.querySelector(".post-req > input").value;
    try {
      const response = await axios.post("/post-text", { inputValue });
      console.log({ axiosPOST: response.data });

      storedText = inputValue;
    } catch (error) {
      console.log({ error });
    }
  }

  async function patchText() {
    const inputValue = document.querySelector(".patch-req > input").value;
    try {
      const response = await axios.patch("/patch-text", { inputValue });
      console.log({ axiosPATCH: response.data });

      storedText = inputValue;
    } catch (error) {
      console.log({ error });
    }
  }

  async function deleteText() {
    const spanText = document.querySelector(".get-req > p > span");
    try {
      const response = await axios.delete("/delete-text");
      console.log({ axiosDELETE: response.data });

      // reset text content
      spanText.textContent = response.data.storedText;
    } catch (error) {
      console.log({ error });
    }
  }
});
