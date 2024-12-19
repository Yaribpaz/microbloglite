"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Redirect to login if user is not logged in
  if (!isLoggedIn()) {
    window.location.assign("index.html");
    return;
  }

  // Load profile information
  initializeProfile();
});

/**
 * Initializes the profile page with user data.
 */
async function initializeProfile() {
 // Replace handle

  // Fetch additional user details if available
  await fetchAndPopulateUserDetails();
}

/**
 * Fetches additional user details from the backend and updates the profile page.
 */
async function fetchAndPopulateUserDetails() {
  const authToken = getLoginData().token;
  const defaultAvatarUrl = "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png";

  try {
    const response = await fetch(`${apiBaseURL}/api/users/${getLoginData().username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const userDetails = await response.json();

      // Update additional details in the profile
      const profileBio = document.querySelector(".profileBio");
      const profilePicture = document.querySelector(".profilePicture");

      const profileName = document.querySelector(".profileName");
      const profileHandle = document.querySelector(".profileHandle");

      profileName.textContent  = userDetails.fullName
      profileHandle.textContent = `@${userDetails.username}`

      profileBio.textContent = userDetails.bio || "No bio available.";
      profilePicture.src = userDetails.avatarUrl || defaultAvatarUrl;
    } else {
      console.error("Failed to fetch user details", await response.json());
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
