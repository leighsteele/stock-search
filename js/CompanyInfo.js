class CompanyInfo {
    constructor(htmlElement, symbol) {
        this.htmlElement = htmlElement;
        this.createProfileCard();
        this.renderCompanyProfile(symbol);
    }

    createProfileCard() {
        this.profileCardBody = document.createElement('div');
        this.htmlElement.appendChild(this.profileCardBody);
    }

    async renderCompanyProfile(symbol) {
        const company = await fetchCompanyProfileViaInternalServer(symbol);
        this.createProfileElements(company, symbol);
        this.renderChart(symbol);
    }

    createProfileElements(company) {

        //image
        const companyImage = document.createElement('img');
        companyImage.src = company.profile.image;

        //name
        const name = document.createElement('h1');
        name.innerText = company.profile.companyName;
        name.className = 'my-3';

        //website
        const companyWebsite = document.createElement('a');
        companyWebsite.href = company.profile.website;

        //description
        const companyDescription = document.createElement('div');
        companyDescription.innerText = company.profile.description;
        companyDescription.className = 'text-muted my-3';

        //price
        const stockPrice = document.createElement('h5');
        stockPrice.innerHTML = `Stock price: $${company.profile.price}`;

        //changes
        const stockChanges = document.createElement('h5');
        stockChanges.innerText = company.profile.changes;
        if (company.profile.changes >= 0) {
            stockChanges.className = 'green';
        } else {
            stockChanges.className = 'red';
        }

        //append
        this.profileCardBody.appendChild(companyImage);
        this.profileCardBody.appendChild(name);
        this.profileCardBody.appendChild(stockPrice);
        this.profileCardBody.appendChild(stockChanges);
        this.profileCardBody.appendChild(companyWebsite);
        this.profileCardBody.appendChild(companyDescription);
    }

    async renderChart(symbol) {
        const data = await fetchHistoricalPriceData(symbol);

        loader.classList.add('show');

        let dates = [];
        let prices = [];

        for (let i = 0; i < 21; i++) {
            dates.push(data.historical[i].date);
            prices.push(data.historical[i].close);
        }

        const myChart = document.createElement('canvas');
        myChart.id = 'myChart';
        myChart.className = 'pr-3'
        this.profileCardBody.appendChild(myChart);
        
        var ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: dates.reverse(), //x-axis
                datasets: [{
                    label: 'Stock History',
                    backgroundColor: 'rgb(60, 80, 245)',
                    borderColor: 'black',
                    data: prices, //y-axis
                }]
            },

            options: {}
        });
        loader.classList.remove('show');
    }
}