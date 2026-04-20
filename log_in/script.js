const username = document.querySelector("input#username")
const password = document.querySelector("input#password")
const submitBtn = document.querySelector("input#submitBtn")

function showErrMessage(input, message)
{
    const div_box = input.parentElement;
    const error = div_box.querySelector('p.error')
    error.textContent = message
}

function checkIsEmpty(input)
{
    const label = input.parentElement.querySelector("label").textContent
                  .replace(":", "")
                  .replace("*", "")
                  .toLocaleLowerCase()

    if(input.value.trim() === "")
    {
        showErrMessage(input, `The ${label} field is required`)
    }
    else 
    {
        showErrMessage(input, '')
    }
}

function isErrors()
{
    const error_messages = [...document.querySelectorAll('p.error')];
    for(let error of error_messages)
    {
        if(error.textContent !== "")
        {
            return true
        }
    }
    
    return false
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkIsEmpty(username)
    checkIsEmpty(password)
    
    if(!isErrors())
    {
        const sing_up_data = JSON.parse(localStorage.getItem('sing_up_data'))
        if(!sing_up_data)
        {
            alert("No user registered. Please sign up first.")
            return
        }
        
        const isUsernameMatch = sing_up_data.username === username.value
        const isEmailMatch = sing_up_data.email === username.value
        const isPasswordMatch = sing_up_data.password === password.value
        
        if((isUsernameMatch || isEmailMatch) && isPasswordMatch)
        {
            alert("Logged in successfully");
            
            const log_in_data = {
                username: username.value,
                login_time: new Date().toString()
            }
            localStorage.setItem('log_in_data', JSON.stringify(log_in_data))
        }
        else
        {
            alert("Invalid username/email or password");
        }
    }
    
})
