/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    // Parse JSON data into JavaScript objects
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Select save and delete buttons
    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#delete');
  
    // Function to generate the user list
    function generateUserList(users, stocks) {
      const userList = document.querySelector('.user-list');
      // Clear existing list items
      userList.innerHTML = '';
  
      users.map(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
  
      // Register the event listener for the user list
      userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }
  
    // Function to handle user list item clicks
    function handleUserListClick(event, users, stocks) {
      const userId = event.target.id;
      const user = users.find((u) => u.id == userId);
  
      if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
      }
    }
  
    // Function to populate the form with user data
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = user.firstname;
      document.querySelector('#lastname').value = user.lastname;
      document.querySelector('#address').value = user.address;
      document.querySelector('#city').value = user.city;
      document.querySelector('#email').value = user.email;
    }
  
    // Function to render a user's portfolio
    function renderPortfolio(user, stocks) {
      const portfolioDetails = document.querySelector('.portfolio-list');
      portfolioDetails.innerHTML = ''; // Clear previous portfolio items
  
      user.portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = `Shares: ${owned}`;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
  
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
      });
  
      portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          viewStock(event.target.id, stocks);
        }
      });
    }
  
    // Function to view stock details
    function viewStock(symbol, stocks) {
      const stock = stocks.find((s) => s.symbol === symbol);
      const stockArea = document.querySelector('.stock-form');
  
      if (stock) {
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
  
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
      }
    }
  
    // Register event listener on the save button
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const id = document.querySelector('#userID').value;
      const userIndex = userData.findIndex((user) => user.id == id);
  
      if (userIndex !== -1) {
        userData[userIndex].user.firstname = document.querySelector('#firstname').value;
        userData[userIndex].user.lastname = document.querySelector('#lastname').value;
        userData[userIndex].user.address = document.querySelector('#address').value;
        userData[userIndex].user.city = document.querySelector('#city').value;
        userData[userIndex].user.email = document.querySelector('#email').value;
  
        generateUserList(userData, stocksData);
      }
    });
  
    // Register event listener on the delete button
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const id = document.querySelector('#userID').value;
      const userIndex = userData.findIndex((user) => user.id == id);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
      }
    });
  
    // Initial rendering of the user list
    generateUserList(userData, stocksData);
  });
  