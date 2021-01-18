class SearchResult {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.createUl();
        this.matchQuery;
    }

    createUl() {
        this.ul = document.createElement("ul");
        this.ul.className = 'list-group list-group-flush';
        this.htmlElement.appendChild(this.ul);
    }

    createLiElements(companies) {
        companies.forEach(company => {
            //regex
            let newSymbol = company.symbol;
            this.matchQuery = document.getElementById('search-input').value;
            const regex = new RegExp(this.matchQuery, "gi");
            const highlightedName = company.profile.companyName.replace(regex, (match) => `<mark class='highlighted px-0'>${match}</mark>`);
            const highlightedSymbol = newSymbol.replace(regex, (match) => `<mark class='highlighted px-0'>${match}</mark>`);
            company.profile.companyName = highlightedName;

            //li
            const companyLi = document.createElement('li');
            companyLi.className = 'list-group-item d-flex justify-content-between';

                //linkWrapper div
                const companyLinkWrapper = document.createElement('div');

                    //link
                    const companyLink = document.createElement('a');
                    companyLink.href = `./company.html?symbol=${company.symbol}`;
                    companyLink.className = 'custom-list-item d-flex justify-content-between align-items-center';

                        //image
                        const companyImage = document.createElement('img');
                        companyImage.src = company.profile.image;
                        companyImage.className = 'custom-img pr-2';

                        //name
                        const name = document.createElement('h6');
                        name.innerHTML = company.profile.companyName;

                        //symbol
                        const companySymbol = document.createElement('span');
                        companySymbol.innerHTML = `(${highlightedSymbol})`;
                        companySymbol.className = 'link-symbol px-2';

                        //changes
                        const companyChanges = document.createElement('span');
                        companyChanges.innerText = company.profile.changes;
                        companyChanges.className = `${(company.profile.changes > 0) ? 'green' : 'red'}`;

                        //append to link
                        companyLink.appendChild(companyImage);
                        companyLink.appendChild(name);
                        companyLink.appendChild(companySymbol);
                        companyLink.appendChild(companyChanges);

                        //append to linkWrapper
                        companyLinkWrapper.appendChild(companyLink);

                //append to li
                companyLi.appendChild(companyLinkWrapper);
                
                this.ul.appendChild(companyLi);
        });
    }
    
    renderResults = (companies) => {
        this.ul.innerHTML = '';
        const loader = document.getElementById('loader');
        loader.classList.add('show');
        this.createLiElements(companies);
        loader.classList.remove('show');
    }
}