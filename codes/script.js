
//Form verification
let LoginForm = document.getElementById('LoginForm');

if(LoginForm != null){
    var failedAttempts = 0;

    LoginForm.addEventListener('submit', function(event) {
        console.log("Hit")
        event.preventDefault(); // Prevents form from submitting
    
        
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        // Simulated login - hardcoded credentials
        const validUsername = "user1";
        const validPassword = "pass123";
    
        if (username === validUsername && password === validPassword) {
            localStorage.setItem('loggedIn', 'true'); // Store login state
            window.location.href = 'products.html'; // Redirect to home page after login
            
        } else {
            // document.getElementById('message').innerText = 'Invalid credentials. Please try again.';
            failedAttempts++;
            alert("Invalid credentials, please try again.  " + failedAttempts);
           
            localStorage.setItem('loggedIn', 'false'); // Store login state

            if (failedAttempts == 3) {
                window.location.href = "error.html"; // Redirect to an error page
            }
        }
        // loginButton.style.display = 'none';
    });
}

let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function() {
    console.log('Scroll Event');
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down: hide the header
        header.style.top = "-200px"; // Move it up (adjust the value based on header height)
    } else {
        // Scrolling up: show the header
        header.style.top = "0";
    }

    lastScrollTop = currentScroll;
});


