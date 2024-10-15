const button = document.getElementById("clickButton");
const contentDiv = document.getElementById("content");

button.addEventListener("click", fetchData);

async function fetchData() {
    try{
        contentDiv.style.display = 'flex'; //makes the box visible.
        contentDiv.innerHTML = "loading..."; // Shows the loading message

        const response = await fetch("https://dummyjson.com/posts");
    
        if(!response.ok){
            throw new Error("Failed to fetch data.");
        }
        
        const data = await response.json();
    
        const posts = data.posts;
        contentDiv.innerHTML = "<h3> Post titles:</h3><ul>"
        + posts.map( post => `<li>${post.title}</li>`).join('')
        +"<ul>";
    
    }catch(error){
        contentDiv.innerHTML = "Error: " + error.message;
    }
}