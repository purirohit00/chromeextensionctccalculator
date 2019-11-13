


function clickHandler(e) {
    var userName = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    
    if(userName=='mahadevi@kovaion.com'&& password=="123")
    {
        window.location.href="Kovaion_ctc.html"; 
    }
    
}

document.addEventListener('DOMContentLoaded', function() {
       document.getElementById('save').addEventListener('click', clickHandler);
});