function get_selected_book_from_url() 
{
    const params = new URLSearchParams(window.location.search)
    if (!params.has('title')) {
        return null
    }

    return {
        title: params.get('title'),
        author_name: params.get('author_name'),
        first_publish_year: params.get('first_publish_year'),
        cover_i: params.get('cover_i'),
    }
}

const selected_book = get_selected_book_from_url()
const book_detail = document.querySelector('.book_detail_container')
let opinions = []

if (!selected_book) 
{
    book_detail.innerHTML = '<p>No book selected. <a href="/books">Go back</a></p>'
} else 
{
    const book_html = `
        <div class="book_detail_content">
            <div class="book_detail_cover">
                <img src="https://covers.openlibrary.org/b/id/${selected_book.cover_i}-M.jpg" alt="${selected_book.title}">
            </div>
            <div class="book_detail_info">
                <h1>${selected_book.title}</h1>
                <p><span class="label">Author:</span> ${selected_book.author_name}</p>
                <p><span class="label">First Published:</span> ${selected_book.first_publish_year}</p>
            </div>
        </div>

        <div class="opinions_section">
            <h2>My Opinions</h2>
            <div class="opinion_form">
                <textarea class="opinion_input" placeholder="Share your opinion about this book..."></textarea>
                <p class="error"></p>
                <button onclick="add_opinion()">Add Opinion</button>
            </div>
            <div class="opinions_container"></div>
        </div>
    `

    book_detail.innerHTML = book_html

    load_opinions()
}

function load_opinions() 
{
    const opinions_container = document.querySelector('.opinions_container')
    
    if (opinions.length === 0) 
    {
        opinions_container.innerHTML = '<p style="color: #999;">There is no opinions. Be the first to share!</p>'
        return
    }

    opinions_container.innerHTML = opinions.map((opinion, index) => `
        <div class="opinion_item">
            <p class="opinion_username">${opinion.username}</p>
            <p class="opinion_text">${opinion.text}</p>
            <p class="opinion_date">${new Date(opinion.date).toLocaleString('en-GB')}</p>
            <button onclick="delete_opinion(${index})" style="background-color: #dc3545; padding: 5px 10px; border: none; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
        </div>
    `).join('')
}

function add_opinion() 
{
    const opinion_input = document.querySelector('.opinion_input')
    const opinion_error = document.querySelector('.error')
    const text = opinion_input.value.trim()

    if (!text) 
    {
        alert('Please enter an opinion')
        return
    }

    if(localStorage.getItem('log_in_data') === null)
    {
        opinion_error.textContent = 'Log in to be able to leave comments'
        return
    }

    opinion_error.textContent = ''
    opinions.push({
        username: JSON.parse(localStorage.getItem("log_in_data")).username,
        text: text,
        date: new Date().toString()
    })

    opinion_input.value = ''
    load_opinions()
}

function delete_opinion(index) 
{
    if (confirm('Are you sure you want to delete this opinion?')) 
    {
        opinions.splice(index, 1)
        load_opinions()
    }
}
