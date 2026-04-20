const username = document.querySelector("input#username")
const name = document.querySelector("input#name")
const surname = document.querySelector("input#surname")
const email = document.querySelector("input#email")
const password = document.querySelector("input#password")
const rep_password = document.querySelector("input#rep_password")
const terms = document.querySelector("input#terms")
const submitBtn = document.querySelector("input#submitBtn")

function showErrMessage(input, message)
{
    const div_box = input.parentElement;
    const error = div_box.querySelector('p.error')
    error.textContent = message
}

function checkLenght(input, minLength)
{
    const label = input.parentElement.querySelector("label").textContent
                  .replace(":", "")
                  .replace("*", "")
                  .toLocaleLowerCase()

    if(input.value.length < minLength)
    {
        showErrMessage(input, `The ${label} field must contain at least ${minLength} characters`)
    }
    else 
    {
        showErrMessage(input, '')
    }
}

function checkEmail()
{
    // Source - https://stackoverflow.com/a/46181
    // Posted by John Rutherford, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-04-20, License - CC BY-SA 4.0
    const email_re_exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!email_re_exp.test(email.value))
    {
        showErrMessage(email, 'Email is invalid')
    }
    else 
    {
        showErrMessage(email, '')
    }
}

function checkPassword()
{
    if(password.value != rep_password.value)
    {
        showErrMessage(rep_password, 'Passwords are different')
    }
    else 
    {
        showErrMessage(rep_password, '')
    }
}

function checkTerms()
{
    if(!terms.checked)
    {
        showErrMessage(terms, 'Accept terms and conditions')
    }
    else 
    {
        showErrMessage(terms, '')
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
    checkLenght(username, 3)
    checkLenght(name, 3)
    checkLenght(surname, 3)
    checkEmail(email)
    checkLenght(password, 3)
    checkLenght(rep_password, 3)
    checkPassword()
    checkTerms()
    
    if(!isErrors())
    {
        alert("Form submitted successfully");

        sing_up_data = {
            username: username.value,
            name: name.value,
            surname: surname.value,
            email: email.value,
            password: password.value
        }

        localStorage.setItem('sing_up_data', JSON.stringify(sing_up_data))
    }
    
})