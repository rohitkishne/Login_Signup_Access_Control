const fullName = document.getElementById('userName')
const email = document.getElementById('userEmail')
const token = document.getElementById('userToken')
const password = document.getElementById('userPassword')
const logoutBtn = document.getElementById('logout-btn')

const currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

const referenceToken = currentUser.userToken;

fullName.innerText = currentUser.userName;
email.innerText = currentUser.userEmail;
token.innerText = referenceToken;
password.innerText = currentUser.userPassword;


logoutBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    // This will remove all items from the session storage
    sessionStorage.removeItem('loggedInUser');
    location.href = '../index.html'
})