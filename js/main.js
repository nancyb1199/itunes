console.log("working");

let mybutton = document.getElementById( "myButton" );
mybutton.addEventListener("click", myCallBack);

let song = document.getElementById("container");
song.addEventListener("click", songCallBack);

function myCallBack(){
  let searchString = document.getElementById('searchBox').value;
  getSongs(searchString);
}

function songCallBack() {
  console.log("in songCallBack");
  let preview = event.target.id;
  console.log(preview);
  document.getElementById("audioSource").src=preview;
}

function getSongs (newString) {
  console.log(newString);
  let url="https://itunes.apple.com/search?term=" + newString;
  let newArray=[];


  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
    response.json().then(function(data) {
      newArray=data.results;
      makeDisplay(newArray);
    });
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });

  function makeDisplay(newArray){
    for (i=0; i<newArray.length; i++){
      newBox = document.getElementById('container');
      let newItem = `
      <div id=${newArray[i].previewUrl} class="box">
      <img src="${newArray[i].artworkUrl100}"><br>
      <h3>${newArray[i].trackName}</h3>
      <h3>${newArray[i].artistName}</h3>
      </div>
      `
      newBox.innerHTML += newItem;
    }
  }

} //end makeDisplay
