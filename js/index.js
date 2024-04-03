
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', handleSubmit);
  });
  
  async function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
      try {
        const userData = await fetchUserData(searchQuery);
        displayUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('Please enter a GitHub username.');
    }
  }
  
  async function fetchUserData(username) {
    const userResponse = await fetch(`https://api.github.com/search/users?q=${username}`);
    const users = await userResponse.json();
    return users.items;
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
      const userItem = document.createElement('div');
      userItem.innerHTML = `
        <img src="${user.avatar_url}" alt="Avatar">
        <p>${user.login}</p>
        <a href="${user.html_url}" target="_blank">View Profile</a>
      `;
      userItem.addEventListener('click', () => {
        fetchUserRepos(user.login);
      });
      userList.appendChild(userItem);
    });
  }
  
  async function fetchUserRepos(username) {
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await reposResponse.json();
      displayRepos(repos);
    } catch (error) {
      console.error('Error fetching user repositories:', error);
    }
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
    repos.forEach(repo => {
      const repoItem = document.createElement('div');
      repoItem.innerHTML = `
        <p><strong>${repo.name}</strong></p>
        <p>${repo.description || 'No description available'}</p>
        <p>Stars: ${repo.stargazers_count}</p>
      `;
      reposList.appendChild(repoItem);
    });
  }