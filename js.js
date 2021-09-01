const loadData = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    input.value = '';
    const url = `http://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
}

const displayData = data => {
    const { docs, numFound } = data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    docs.forEach(book => {
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" alt="${book.title}"
                class="card-img-top" style="height: 450px;" alt="...">
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
                            <th>${(Object.keys(book) === 'author_name') ? book.author_name : 'unknown author'}</th>
                        </tr>
                        <tr>
                            <th>Publisher</th>
                            <th>:</th>
                            <th>${book.publisher_facet}</th>
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
}