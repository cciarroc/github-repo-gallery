//overview div
const overview = document.querySelector(".overview");
//username
const username = "cciarroc";
// ul class repo-list
const repoList = document.querySelector(".repo-list");
// section class repos
const repoSection = document.querySelector(".repos");
// section class repo data
const repoDataSection = document.querySelector(".repo-data");
// back button
const backButton = document.querySelector("button");
// input with search by name placeholder
const filterInput = document.querySelector("input");



const getGithubData = async function(){
    const githubRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await githubRequest.json();
    displayUserInfo(data);
}

getGithubData();
filterInput.classList.remove("hide");

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

async function getRepos (){
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    displayRepos(repoData);
}

getRepos();

function displayRepos (repoData){
    repoData.forEach(function(repo){
        const repoLi = document.createElement("li");
        repoLi.classList.add("repo");
        repoLi.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoLi);
    })
}

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
})

async function getRepoInfo (repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    // grab languages
    const languageData = await fetchLanguages.json();
    const languages = [];
    // make a list of languages
    for (let language in languageData){
    languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
}

function displayRepoInfo(repoInfo, languages){
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name} </h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>`;
    repoDataSection.append(repoDiv);
}

backButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
});


filterInput.addEventListener("input", function(e){
    const search = e.target.value
    const allRepos = document.querySelectorAll(".repo");
    const lowercaseSearch = search.toLowerCase();
    for (let repo of allRepos){
        const lowercaseRepo = repo.innerText.toLowerCase();
        if (lowercaseRepo.includes(lowercaseSearch)){
            repo.classList.remove("hide");
        } else{
            repo.classList.add("hide");
        }
    }
})