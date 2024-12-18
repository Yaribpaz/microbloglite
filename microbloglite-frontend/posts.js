/* Posts Page JavaScript */

"use strict";
//const apiBaseURL = "http://localhost:5005";

const tweetForm = document.getElementById('tweetForm');
const tweetTextInput = document.getElementById('tweetText');


const authToken = getLoginData().token;

tweetForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const tweetText = tweetTextInput.value.trim();

  if (!tweetText) {
    alert("Please enter some text to post.");
    return;
  }

  const newPost = {
    text: tweetText,
    
  };

  try {
    const response = await createPost(newPost);
    if (response.ok) {
      const post = await response.json();
      console.log("Post created successfully", post);
      
      tweetTextInput.value = "";
    } else {
      console.error("Failed to create post", await response.json());
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
});


async function createPost(postData) {
  const response = await fetch(`${apiBaseURL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`, 
    },
    body: JSON.stringify(postData),
  });

  return response;
}