const accKey = "qMjwsRR8FgpjKblC3QJtXe9aMyZXnWImYVWmvRBa3mU";
let search = document.getElementById("search");

// Function to make API calls
async function apiCall(url) {
  const res = await fetch(url);
  const jsRes = await res.json();
  return jsRes;
}

// Function to display data
async function getData() {
  const bodyContainer = document.querySelector(".body");
  bodyContainer.innerHTML = ""; // Clear previous data

  // Fetching data from Unsplash API
  let res = await apiCall(
    `https://api.unsplash.com/photos/?client_id=${accKey}`
  );

  // Filter data based on search input if it's not empty
  const query = search.value.trim().toLowerCase();
  if (query) {
    res = res.filter((item) => item.user.bio?.toLowerCase().includes(query));
  }

  // Displaying data
  res.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("data");

    const img = document.createElement("img");
    img.classList.add("img");
    img.src = element.urls.small;

    const div1 = document.createElement("div");
    div1.classList.add("like");

    const i = document.createElement("i");
    i.classList.add("fa-regular");
    i.classList.add("fa-heart");
    i.id = "heart";

    const likeCount = document.createElement("span");
    likeCount.classList.add("likecount");
    likeCount.innerHTML = element.likes;

    const p = document.createElement("p");
    p.classList.add("bio");
    p.innerHTML = element.user.bio ? element.user.bio : "Bio not available";

    // Append elements to the container
    div.appendChild(img);
    div.appendChild(div1);
    div1.appendChild(i);
    div1.appendChild(likeCount);
    div.appendChild(p);
    bodyContainer.appendChild(div);

    // Like button functionality
    i.addEventListener("click", function () {
      if (i.classList.contains("fa-regular")) {
        likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;
        i.classList.remove("fa-regular");
        i.classList.add("fa-solid");
      } else {
        likeCount.innerHTML = parseInt(likeCount.innerHTML) - 1;
        i.classList.remove("fa-solid");
        i.classList.add("fa-regular");
      }
    });
  });
}

// Fetch data on search input change
search.addEventListener("input", getData);

// Fetch initial data on page load
window.addEventListener("load", getData);
