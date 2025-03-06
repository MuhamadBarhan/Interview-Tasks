// Write your JavaScript code here

const tracks = [
  {
    trackName:"Veyyon Silli",
    trackAuthor:"G.V.Prakash",
    movie:"Soorarai Potru",
    genre:"Melody",
    duration:165
  },
  {
    trackName:"New York Nagaram",
    trackAuthor:"A.R.Rahman",
    movie:"Sillunu Oru Kaadhal",
    genre:"Melody",
    duration:118
  },
  {
    trackName:"Vaathi Coming",
    trackAuthor:"Anirudh",
    movie:"Master",
    genre:"Folk",
    duration:154
  },
  {
    trackName:"Mental Manadhil",
    trackAuthor:"A.R.Rahman",
    movie:"Oh Kadhal Kanmani",
    genre:"Melody",
    duration:180
  },
  {
    trackName:"Aalaporan Tamizhan",
    trackAuthor:"A.R.Rahman",
    movie:"Mersal",
    genre:"Inspirational",
    duration:105
  },
  {
    trackName:"Rowdy Baby",
    trackAuthor:"Yuvan Shankar Raja",
    movie:"Maari 2",
    genre:"Rock",
    duration:138
  },
  {
    trackName:"Kadhal Aasai",
    trackAuthor:"Yuvan Shankar Raja",
    movie:"Anjaan",
    genre:"Melody",
    duration:75
  },
  {
    trackName:"Appadi Podu",
    trackAuthor:"Vidyasagar",
    movie:"Ghilli",
    genre:"Rock",
    duration:144
  }
];


let timer;
let isPlaying= false;
let isShuffle= false;
let curIndex= 0;
let currentTimeVal = 0;
let currentTracks = [...tracks];

const container = document.getElementById("card-container");

const trackName = document.getElementById('track-name');
const trackGenre = document.getElementById('track-genre');
const currentTime = document.getElementById('current-time');
const endTime = document.getElementById('end-time');
const playPauseBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');

const slider = document.getElementById('slider');

currentTracks.forEach(item => {
  let h3=document.createElement("h3");
  h3.textContent=item.trackName;

  let span = document.createElement("span");
  span.textContent=`${item.trackAuthor} \u2022 ${item.movie} \u2022 ${item.genre}`;

  let h4= document.createElement("h4");
  h4.textContent= formatTime(item.duration);

  let button = document.createElement("button");
  button.textContent="\u25b6";
  button.className="play-btn";
  
  let div = document.createElement("div");
  div.appendChild(h3);
  div.appendChild(span);
  div.appendChild(h4);
  div.appendChild(button);
  div.className= "card"
  container.appendChild(div);
});

function loadTrack(index) {
  const track = tracks[index];
  trackName.textContent = track.trackName;
  trackGenre.textContent = track.genre;
  endTime.textContent = formatTime(track.duration);
  slider.max= track.duration;
  currentTimeVal = 0;
  slider.value = 0;
  clearInterval(timer);
  isPlaying = false;
  playPauseBtn.innerHTML = "▶️";
  updateCurrentTime();
}

function playTrack() {
  if(isPlaying) {
    clearInterval(timer);
    isPlaying = false;
    playPauseBtn.innerHTML="▶️";
  } else {
    isPlaying =  true;
    playPauseBtn.innerHTML = "⏸️";
    timer = setInterval(()=>{
      if(currentTimeVal < tracks[curIndex].duration) {
        currentTimeVal++;
        slider.value = currentTimeVal;
        updateCurrentTime();
      } else {
        nextTrack();
      }
    },1000);
  }
}

function nextTrack() {
  curIndex = (curIndex+1)%tracks.length;
  loadTrack(curIndex);
  playTrack();
}

function prevTrack() {
  curIndex = (curIndex-1 + tracks.length)%tracks.length;
  loadTrack(curIndex);
  playTrack();
}

function updateCurrentTime() {
  currentTime.textContent = formatTime(currentTimeVal);
}

function seekTrack() {
  currentTimeVal = parseInt(slider.value);
  updateCurrentTime();
}

function shuffleArray(array) {
  for(let i = array.length-1; i>0;i--) {
    let j = Math.floor(Math.random()*(i+1));
    [array[i],array[j]] = [array[j],array[i]];
  }
}

function shuffleTracks() {
  if(isShuffle) {
    currentTracks=[...tracks];
  } else {
    currentTracks = [...tracks];
    shuffleArray(tracks);
  }
  isShuffle= !isShuffle;
  curIndex=0;
  loadTrack(curIndex);
  shuffleBtn.style.background = isShuffle?"white":"";
}

function formatTime(seconds) {
  let min = Math.floor(seconds/60);
  let sec = Math.floor(seconds%60);
  return `${min}:${sec<10 ? "0":""}${sec}`;
}

document.addEventListener('keydown', (event) => {
  switch(event.code) {
    case "Space":
      playTrack();
      break;
    case "ArrowLeft":
      prevTrack();
      break;
    case "ArrowRight":
      nextTrack();
      break;
  }
});


playPauseBtn.addEventListener("click",playTrack);
nextBtn.addEventListener("click",nextTrack);
prevBtn.addEventListener("click",prevTrack);
slider.addEventListener("input", seekTrack);
shuffleBtn.addEventListener("click", shuffleTracks)

loadTrack(curIndex);
