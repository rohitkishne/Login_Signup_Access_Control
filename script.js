const formContainer = document.getElementById('signup-form')
const signup = document.getElementById("signupbtn")
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const redirectToSignUpPage = document.getElementById('redirect-to-signup');


const alertMessage = document.createElement('p')
alertMessage.setAttribute('class', 'alert-msg')


function generateReferenceToken() {
    let token = '';
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ@#$&';
    const tokenLength = 16;
  
    do {
        // Generate a new token
        token = '';
        for (let i = 0; i < tokenLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          token += characters.charAt(randomIndex);
        }
        // Check if the token already exists in session storage
      } while (sessionStorage.getItem(token) !== null);
    
      return token;
}

signup.addEventListener('click', (event) => {
    event.preventDefault();

    //ensure all field must be filled
    if(fullname.value.trim() === '' || 
        email.value.trim() ==='' || 
        password.value.trim() === '' || 
        confirmPassword.value.trim() === '')
    {
        alertMessage.innerHTML = 'Error: All fields are mandatory!'
        formContainer.appendChild(alertMessage);
    }
    else
    {
        //check password or confirm password is matching or not --------->
        if(password.value.trim() !== confirmPassword.value.trim())
        {
            alertMessage.innerHTML = 'OOPS!, Passord does not match.'
            formContainer.appendChild(alertMessage);
            confirmPassword.value = ''
        }
        else
        {
            // check whether user present or not
            // if present do this --------------->
            if(localStorage.getItem('users'))
            {
                //two condition
                // 1. if the user is not present with the email id
                // 2. if the user is already with the email
                if(checkIfEmailAlreadyExist(email.value))
                {
                    alertMessage.innerHTML = 'Already a user with this Email!'
                    formContainer.appendChild(alertMessage);
                    formContainer.reset();
                }
                else{
                    saveUser(fullname.value, email.value, password.value, confirmPassword.value);
                }
            }
            else{
                // not present do this ---------------->
                saveUser(fullname.value, email.value, password.value, confirmPassword.value);
            }

        }
    }
})

function checkIfEmailAlreadyExist(emailid) {
    let users = JSON.parse(localStorage.getItem('users'))
    //users containes the user in the form of array
    const obj = users.find(userObj=>{
        return userObj.userEmail === emailid;
        // if obj with email is exist ----> return true or otherwise false
    })

    if(obj)
        return true;
    else
        return false;
}



function saveUser(username, useremail, userpassword, userconfirmpassword) {

    const referenceToken = generateReferenceToken();

    let userObj = {
        userToken : referenceToken,
        userName : username,
        userEmail : useremail,
        userPassword : userpassword,
        userConfirmPassword : userconfirmpassword
    }

    let users = JSON.parse(localStorage.getItem('users'));
    //ensure that user is not null
    if(users === null)
    {
        users=[];
    }

    //push the new userObj into the users
    users.push(userObj);

    localStorage.setItem('users', JSON.stringify(users))


     // logic that this user is signed in
    // session storage will delete data after tab is closed
    sessionStorage.setItem('loggedInUser',JSON.stringify(userObj));
    fullname.value='';
    email.value='';
    password.value='';
    confirmPassword.value='';
    alertMessage.innerHTML = 'Your are Successfully Sign up. Thank You!'
    formContainer.appendChild(alertMessage);
    // this is how we handle multiple pages
    // this will redirect to profile folder
    window.location.href='../profile';
}


// redirect to the signup page
redirectToSignUpPage.addEventListener('click', () =>{
    location.href = './index.html'
})