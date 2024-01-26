   // Function to handle the downloadThumbnail button click event
   function downloadThumbnail(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the YouTube video URL from the input field
    let videoUrl = document.getElementById("videoUrl").value;
  
    // Extract the video ID from the YouTube URL using the extractVideoId function
    let videoId = extractVideoId(videoUrl);
    
    // Check if a valid videoId is obtained
    if (videoId) {
      // Get the thumbnail element
      let thumbnail = document.getElementById("thumbnail");
  
      // Construct the URL for the high-resolution thumbnail image
      let url = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
  
      // Set the thumbnail image source to the constructed URL
      thumbnail.src = url;
  
      // Set the download link and filename in global variables for later use
      window.downloadUrl = url;
      window.downloadFilename = videoId + ".jpg";
    } else {
      // Display an alert if the YouTube video URL is invalid
      alert("Invalid YouTube video URL");
    }
  }
  
  // Function to extract the video ID from a YouTube video URL
  function extractVideoId(url) {
    // Regular expression to match YouTube video ID from various YouTube URLs
    let match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\/)([^"&?\/\s]{11})/);
  
    // Return the extracted video ID or null if not found
    return match ? match[1] : null;
  }
  
  // Function to handle the downloadImage button click event
  function downloadImage() {
    // Check if the downloadUrl and downloadFilename variables are set
    if (window.downloadUrl && window.downloadFilename) {
      // Fetch the image data as a blob
      fetch(window.downloadUrl)
        .then(response => response.blob())
        .then(blob => {
          // Create a temporary link and trigger a click event to download the image
          let a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = window.downloadFilename;
          a.click();
        });
    } else {
      // Display an alert if there is no image to download
      alert("No image to download. Please enter a valid YouTube video URL.");
    }
  }