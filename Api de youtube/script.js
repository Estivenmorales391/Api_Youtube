
function buscar() {
    let btn = document.getElementById("buscar");
    let searchInput = document.getElementById("searchQuery");

    btn.addEventListener("click", searchVideos);

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            searchVideos();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    buscar();
});
function searchVideos() {
    const apiKey = 'AIzaSyDbl61M7WEFc-wcWORJBegpLLxRW_nnPN8'; 
    const query = document.getElementById('searchQuery').value;
  
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const videos = data.items;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
  
        videos.forEach(video => {
          const videoTitle = video.snippet.title;
          const videoId = video.id.videoId;
          const videoThumbnail = video.snippet.thumbnails.default.url;
  
          const videoElement = document.createElement('div');
          videoElement.innerHTML = `
            <h2>${videoTitle}</h2>
            <div class="videoWrapper">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            </div>
          `;
  
          resultsDiv.appendChild(videoElement);
        });
      })
      .catch(error => console.error('Error al buscar videos:', error));
  }
  