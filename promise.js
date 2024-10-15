const button = document.getElementById("clickButton");
const contentDiv = document.getElementById("content");

button.addEventListener("click", fetchData);


function fetchData(){
    contentDiv.style.display = 'flex';
    contentDiv.innerHTML = "loading...."

    const fetchPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            console.log("Operation timed out.");
        }, 5000);

        fetch("https://dummyjson.com/posts")
        .then(response => {
            clearTimeout(timeout);   // Clears the timeout if fetch succeeds
            if (!response.ok) {
                reject("Failed to fetch data :( .")
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            resolve(data.posts); // Resolve promise with fetched data
        })
        .catch(error => {
            reject("Error fetching data: " + error.message);
        });
    });

      // Handle promise resolution and rejection
        fetchPromise
        .then(posts => {
            contentDiv.innerHTML = "<h3>Post Titles:</h3><ul>" +
            posts.map(post => `<li>${post.title}</li>`).join('') + "</ul>";
        })
        .catch(errorMessage => {
          contentDiv.innerHTML = errorMessage; // Display error message
        });

}


