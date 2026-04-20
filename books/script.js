
const search_input = document.querySelector("input")
const books_board= document.querySelector("div.books")

function addBooksToDocument(book_data)
{
        if(book_data.cover_i === undefined)
        {
            return
        }

        const book = {
            div: document.createElement('div'),
            cover: document.createElement('img'),
            title: document.createElement('h2'),
            author: document.createElement('h3'),
            year: document.createElement('h3')
        }

        book.div.classList.add("book")

        book.cover.classList.add("book_cover")
        book.cover.src = "https://covers.openlibrary.org/b/id/" + book_data.cover_i + "-M.jpg"
        book.div.appendChild(book.cover)

        book_info = document.createElement("div")
        book.div.appendChild(book_info)

        book.title.textContent = book_data.title
        book.title.style.cursor = "pointer"
        book.title.addEventListener('click', function() {
            const params = new URLSearchParams()
            params.set('title', book_data.title)
            params.set('author_name', book_data.author_name[0])
            params.set('first_publish_year', book_data.first_publish_year)
            params.set('cover_i', book_data.cover_i)
            window.location.href = '/book?' + params.toString()
        })
        book.div.lastChild.appendChild(book.title)

        book.author.textContent = book_data.author_name
        book.div.lastChild.appendChild(book.author)

        book.year.textContent = book_data.first_publish_year
        book.div.lastChild.appendChild(book.year)

        books_board.appendChild(book.div)
}
    
function getBooks()
{
    let apiData = []
    book_name = search_input.value
    openLibApiUrl = 'https://openlibrary.org/search.json?q='+ book_name.split(" ").join("+")
    console.log("Gatting data from: " + openLibApiUrl)

    books_board.innerHTML = ""
    apiWaitMessage = document.createElement('h2')
    apiWaitMessage.textContent = "Waiting for Open Library API answer"
    books_board.appendChild(apiWaitMessage)
    axios.get(openLibApiUrl).then((res) =>
    {
        apiData = res.data
        console.log(apiData.docs)

        books_board.innerHTML = ""
        apiData.docs.forEach(addBooksToDocument)
    })

}

function getBooksByEnter(e)
{
    if(e.key == 'Enter')
    {
        getBooks()
    }
}

search_input.addEventListener('keypress', getBooksByEnter)

