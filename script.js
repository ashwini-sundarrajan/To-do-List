var user = JSON.parse(localStorage.getItem("user"));
    if(user)
    {
        document.getElementById("nameprint").innerText= "Hi, "+user.name+",";
        document.getElementById("schename").innerText= ""+user.name;
    }
    function togglemenu()
    {
        var menu= document.getElementById("menu")
        if(menu.style.display=== "none" || menu.style.display==="")
        {
            menu.style.display="block";
        }
        else
        {
            menu.style.display= "none";
        }
    }

    var today= new Date()
    document.getElementById("date").innerText=today.getDate();
    var monthNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("month").innerText= monthNames[today.getMonth()];

    function saveMood(emoji)
    {
        let moods= JSON.parse(localStorage.getItem("moods"))||[];
        moods.push(emoji);
        localStorage.setItem("moods", JSON.stringyfy(moods));
    }

    const container = document.getElementById("checkboxContainer");

// function to add a task row
function addCheckbox(placeholder = "Add task") {
  const div = document.createElement("div");
  div.className = "checkbox-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-text";
  input.placeholder = placeholder;

  // strike out if checked
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      div.classList.add("done");
    } else {
      div.classList.remove("done");
    }
  });

  // add new task if Enter is pressed inside input
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCheckbox();
      e.preventDefault(); // prevent newline
    }
  });

  div.appendChild(checkbox);
  div.appendChild(input);
  container.appendChild(div);

  input.focus(); // focus new task
}

// add one default task bar on load
addCheckbox();


var dayNames= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function generateCalender()
{
  var today= new Date();
  var month= today.getMonth();
  var year= today.getFullYear();
  document.getElementById("month-name").innerText= monthNames[month];

  var datesrow= document.getElementById("dates-row");
  datesrow.innerHTML="";

  var daysInMonth= new Date(year, month+1,0).getDate();

  for(let day=1; day<= daysInMonth; day++)
  {
    var date= new Date(year, month, day);
    var dayName= dayNames[date.getDay()];

    var dateItem= document.createElement("div");
    dateItem.classList.add("date-item");

    dateItem.innerHTML= `
    <div class= "day-num"> ${day} </div>
    <div class= "dot">•</div>
    <div class="day-name"> ${dayName} </div>`;

    if (day === today.getDate()) {
      dateItem.classList.add("today");
    }

    // Make dates clickable
    dateItem.addEventListener("click", () => {
      document.querySelectorAll(".date-item").forEach(el => el.classList.remove("selected"));
      dateItem.classList.add("selected");
      dateItem.style.backgroundColor= "#EAB8B7";
    });


    datesrow.appendChild(dateItem);
  }
}

generateCalender();

function addToPlaylist() {
  const input = document.getElementById("songInput");
  const url = input.value.trim();
  let embedURL = "";

  if (url.includes("spotify.com/playlist")) {
    const id = url.split("/playlist/")[1].split("?")[0];  
    embedURL = `https://open.spotify.com/embed/playlist/${id}?utm_source=generator`;  
  } else {
    alert("Please paste a valid Spotify playlist link.");
    return;
  }

  // Container for iframe + menu
  const playlistContainer = document.createElement("div");
  playlistContainer.classList.add("playlist-container");

  // Three-dot menu
  const menuBtn = document.createElement("div");
  menuBtn.classList.add("menu-btn");
  menuBtn.innerHTML = "⋮";

  // Dropdown menu
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = `<button class="delete-btn">Delete</button>`;
  dropdown.style.display = "none";

  menuBtn.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  });

  // Delete button action
  dropdown.querySelector(".delete-btn").addEventListener("click", () => {
    playlistContainer.remove();
  });

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = embedURL;
  iframe.width = "100%";
  iframe.height = "380";
  iframe.frameBorder = "0";
  iframe.allowfullscreen = true;
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

  

  playlistContainer.appendChild(menuBtn);
  playlistContainer.appendChild(dropdown);
  playlistContainer.appendChild(iframe);

  document.getElementById("playlist").appendChild(playlistContainer);
  input.value = "";
}

const fileInput = document.getElementById('fileInput');
    const profileImage = document.getElementById('profileImage');

    fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImage.src = e.target.result; // change the circle image
        }
        reader.readAsDataURL(file);
      }
    });