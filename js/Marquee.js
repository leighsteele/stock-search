class Marquee {
    constructor(element) {
        this.element = element;
        this.getMarqueeData();
    }

    async getMarqueeData() {
        let marqueeData = await fetchMarqueeData();
        for (let i = 0; i < 50; i++) {
            this.marqueeDisplay(marqueeData[i]);
        }
    }

    marqueeDisplay(stock) {
        const companyData = document.createElement('span');
        const companyPrice = document.createElement('span');
        const companySymbol = document.createElement('span');

        companySymbol.innerText = `${stock.symbol}`;
        companyPrice.innerText = `$${stock.price}`;
        companyData.appendChild(companySymbol);
        companyData.appendChild(companyPrice);
        this.element.appendChild(companyData);
        
        companySymbol.classList.add('marquee-item');
        companyPrice.classList.add('marquee-price');
    }
}