const container = document.getElementById("pwaroot");
const moviename = document.getElementById("pwaquery");
const search = document.getElementsByClassName("pwabtn")[2];
const formulaire = document.getElementById("pwaformulaire");
const keyValue = document.getElementById("pwakeyValue");
const checkKey = document.getElementById("pwacheckKey");
const remove = document.getElementById("pwaremove");
const wrapper = document.getElementById("pwawrap");


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTEwMTdhOGEwNDJkYTBkM2IyNTFhOTE4N2RhN2Y5NyIsInN1YiI6IjY1MzRiYmM0YzhhNWFjMDBlMmI3MDQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmIpDTzM8iPA7irTZ1HjUs2fzT4tHweFnH_Bi777ws8'
  }
};
remove.addEventListener('click', async () => {
  localStorage.removeItem("apikey");
  wrapper.style.display = "none";
  formulaire.style.display = "flex"
})

checkKey.addEventListener('click', async () => {
  // checkKey.style.display = "none"; // Disable the search button
 
  fetch(`https://api.themoviedb.org/3/search/movie?query=d&api_key=${keyValue.value}`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if(json.status_code === 7){
        alert(json.status_message + "\n \nTry this: e99b3eeabd811b66fedbb695cd4ba8c5");
      }
      if(json.results){
        localStorage.setItem('apikey', keyValue.value)
        window.location.reload();
        formulaire.style.display = "none"
      }
    })
    .catch(err => {
      console.error('error:' + err)
    });
})

search.addEventListener('click', async () => {
  search.style.display = "none"; // Disable the search button
  let output = "";
  if(moviename.value !== ""){
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename.value}&api_key=${API_KEY}`)
    .then(res => {
      if(!res.ok){
        return [];
      }
      return res.json();
    })
      search.style.display = "inline"; // Re-enable the search button
      data?.results.map((movie) =>
      (output += `
        <div class="box">
            <div class="box-img">
              <a href="https://image.tmdb.org/t/p/w500${movie?.poster_path}">
                <img src="https://image.tmdb.org/t/p/w500${movie?.poster_path}" alt="">
              </a>
            </div>
            <div class="box-content">
              <div class="box-cont-header">
                <h3>${movie?.original_title}</h3>
                <span>${movie?.release_date}</span>
              </div>
              <div class="describe">
                  ${movie?.overview}
              </div>
            </div>
        </div>
      `)
    );
    container.innerHTML = output;
  }
  else{
    search.style.display = "inline"; // Re-enable the search button
    alert("Empty search field")
  }
})

function getApiKey(){
  const apikey = localStorage.getItem('apikey')
  console.log(apikey)
  if(apikey){
    API_KEY = apikey;
    formulaire.style.display = "none";
    wrapper.style.display = "flex";
  }
}
document.addEventListener("DOMContentLoaded", getApiKey);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
