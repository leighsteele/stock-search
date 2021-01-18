const BASE_URL = 'http://localhost:3000';

async function fetchMarqueeData() {
  const response = await fetch(
      `${BASE_URL}/quotes`
  );
  const data = await response.json();
  return data;
}

// search stocks
async function searchViaInternalServer(searchTerm) {
  const response = await fetch(`${BASE_URL}/search?query=${searchTerm}`);
  const data = await response.json();
  return data;
}

async function fetchCompanyProfileViaInternalServer(symbol) {
  const response = await fetch(`${BASE_URL}/profile?query=${symbol}`);
  const data = await response.json();
  return data;
}

//chart data
async function fetchHistoricalPriceData(symbol) {
  const response = await fetch(`${BASE_URL}/price?query=${symbol}`);
  const data = await response.json();
  return data;
}

async function searchHistoryViaInternalServer() {
  const response = await fetch(`${BASE_URL}/search-history`);
  const data = await response.json();
  return data;
}

async function searchIDViaInternalServer(id) {
  const response = await fetch(`${BASE_URL}/search-history/${id}`);
}