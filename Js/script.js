// loading function
const displaySpinner = display => {
    document.getElementById('spinner').style.display = display;
}

// displaying main content function
const displayContent = display => {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.style.display = display);
}

// error function
const displayError = display => {
    document.getElementById('error').style.display = display;
}

// search function
const loadData = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    input.value = '';
    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    if (inputText === '') {
        displayError('block');
        displayContent('none');
    } else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data))
        displayError('none');
        displaySpinner('block');
        displayContent('none');
    }
}

// function to display data
const displayData = data => {

    const { docs, numFound } = data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // condition for error handling
    if (docs.length !== 0) {
        displayContent('none');
        displayError('none');

        docs.forEach(book => {
            // new card generating
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" alt="${book.title}"
                    class="card-img-top" style="height: 450px; border-radius: 10px; border: 1px solid black" alt="...">
                <div class="card-body">
                    <table class="table">
                        <tbody class="text-start">
                            <tr>
                                <th>Book Name</th>
                                <th>:</th>
                                <th>${book.title}</th>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <th>:</th>
                                <th>${book.author_name ? book.author_name[0] : 'unknown author'}</th>
                            </tr>
                            <tr>
                                <th>Publisher</th>
                                <th>:</th>
                                <th>${book.publisher ? book.publisher[0] : 'unknown author'}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <small class="text-muted">First published in ${book.first_publish_year}</small>
                </div>
            </div>
            `
            cardContainer.appendChild(col);
            document.getElementById('search-result').textContent = `${numFound}`;

        })
        displaySpinner('none');
        displayContent('block');
    }
    else {
        displaySpinner('none');
        displayContent('none');
        displayError('block');
    }
}