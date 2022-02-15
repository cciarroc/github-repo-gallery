//overview div
const overview = document.querySelector(".overview");
//username
const username = "cciarroc";

const getGithubData = async function(){
    const githubRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await githubRequest.json();
    displayUserInfo(data);
}

getGithubData();

function displayUserInfo(data){
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
    `;
    overview.append(userDiv);
}