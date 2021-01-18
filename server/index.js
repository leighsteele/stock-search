require('dotenv').config('../.env');

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;

const app = express();
const port = 3000;

app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

async function fetchMarqueeData() {
    const response = await fetch(
        `${BASE_URL}/quotes/nasdaq?apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
}

async function searchStocks(searchTerm) {
    const response = await fetch(
        `${BASE_URL}/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
}

async function searchWithProfile(searchTerm) {
    const companies = await searchStocks(searchTerm);
    const fetchCompaniesProfiles = companies.map(company => {
        return fetchCompanyProfile(company.symbol);
    });
    const companiesWithProfiles = await Promise.all(fetchCompaniesProfiles);
    return companiesWithProfiles;
}

async function fetchCompanyProfile(symbol) {
    const response = await fetch(
        `${BASE_URL}/company/profile/${symbol}?apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
}

async function fetchHistoricalPriceData(symbol) {
  const response = await fetch(
    `${BASE_URL}/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`
  );
  const data = await response.json();
  return data;
}

app.get('/quotes', (req, res) => {
    fetchMarqueeData().then((quotes) => {
        res.send(quotes);
    });
});

app.get('/search', (req, res) => {
    const searchQuery = req.query.query;
    searchWithProfile(searchQuery).then((companiesWithProfiles) => {
        res.send(companiesWithProfiles);

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = companiesWithProfiles;

            myobj.forEach(company => {
                company.searchDate = new Date();
            })

            //insert document into collection (if collection doesn't exist it gets created here)
            dbo.collection("search").insertMany(myobj, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    })
});

app.get('/profile', (req, res) => {
    const searchQuery = req.query.query;
    fetchCompanyProfile(searchQuery).then((companyProfile) => {
        res.send(companyProfile);
    });
});

app.get('/price', (req, res) => {
    const searchQuery = req.query.query;
    fetchHistoricalPriceData(searchQuery).then((priceData) => {
        res.send(priceData);
    });
});

app.get('/search-history', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let mysort = { searchDate: -1 }; // -1 sorts by descending order
        dbo.collection("search").find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });
    })
})

// delete search history item
app.get('/search-history/:id', (req, res) => {
    const id = req.params.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let documentID = new ObjectID(id);
        dbo.collection("search").deleteOne({ _id: documentID }, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
