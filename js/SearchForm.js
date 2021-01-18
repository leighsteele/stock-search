class SearchForm {
    constructor(htmlElement) {
        const searchForm = document.createElement('form');
        searchForm.className = 'form-group d-flex';
        const searchInput = document.createElement('input');
        searchInput.id = 'search-input';
        searchInput.className = 'form-control rounded-0';
        searchInput.name = 'search';
        searchInput.type = 'text';
        searchInput.placeholder = 'aa';
        searchForm.appendChild(searchInput);

        const button = document.createElement('button');
        button.className = 'btn btn-outline-secondary btn-custom rounded-0';
        button.type = 'submit';
        button.innerText = 'Search';
        searchForm.appendChild(button);

        htmlElement.appendChild(searchForm);

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchInput = event.target.querySelector('input[name=search]');
            this.searchCompanies(searchInput.value);
        });
    }

    async searchCompanies(searchTerm) {
        const companies = await searchViaInternalServer(searchTerm); //search via internal server instead
        this.onSearchDoneCallback(companies);
    }

    onSearchDone(callback) {
        this.onSearchDoneCallback = callback;
    }
}