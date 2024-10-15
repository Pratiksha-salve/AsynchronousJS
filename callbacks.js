const button = document.getElementById("clickButton");
const contentDiv = document.getElementById("content");

// Add event listener to the button
button.addEventListener("click", () => {

    // Display the content box after the button is clicked
    contentDiv.style.display = 'flex';

    // Display a loading message initially
    contentDiv.innerHTML = `Please wait, executing...`;

    delayCallback(fetchData, 5000);
    
});

// Delay function that accepts a callback
function delayCallback(callback, delay) {
    setTimeout(() => {
        contentDiv.innerHTML = "Fetch Successful!!!!!";
        callback(); // Call the function after the delay
    }, delay);
}

// Fetch data function to be passed as a callback
function fetchData() {
    fetch("https://dummyjson.com/posts")
        .then(response => response.json())
        .then(result => {
            const posts = result.posts;
            contentDiv.innerHTML = "<h3>Post Titles:</h3><ul>" +
                posts.map(post => `<li>${post.title}</li>`).join('') +
                "</ul>";
        })
        .catch(error => {
            // Handle errors if the fetch fails
            contentDiv.innerHTML = "Error fetching data: " + error.message;
        });
}
