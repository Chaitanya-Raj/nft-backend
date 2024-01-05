# Polygon NFT

## Use

This API is to be used by parts of the Polygon website to fetch data from Airtable.

## How it works

This application is based on [Express.js](https://expressjs.com/).

### Routing

Routing in this application is handled by Express.js.

We need to fetch data from multiple tables of the same base. For each table, we have created a separate endpoint.

#### Current Endpoints

- `/api/v1/nft`
- `/api/v1/nft/:id`
- `/api/v1/council`
- `/api/v1/marketplace`

### Fetching the data

We are using the [official airtable.js](https://github.com/Airtable/airtable.js) library to communicate with Airtable and fetching the table data.

## Setup

### Environment Variables

Tp make the application run on your local machine, create a `.env` file in the root of the project with the following environment variable in it.

- AIRTABLE_API_KEY = A [Personal Access Token](https://airtable.com/create/tokens) from an Airtable account which has access to our target base.
- AIRTABLE_BASE_ID = The BaseId in which the target tables are located.
- NFT_TABLE_ID = The tableId from where data for the NFTs is to be fetched.
- COUNCIL_TABLE_ID = The tableId from where data for the Council page is to be fetched.
- MARKETPLACE_TABLE_ID = The tableId from where data for the Marketplaces is to be fetched.

### Local

#### Install

```bash
npm install
```

#### Dev

```bash
npm run dev
```

### Docker

#### Build

```bash
docker build --tag <tag> .
```

#### Run

```bash
docker run -p 3000:3000 --env-file .env <tag>
```

Developed by [@TeamEPYC](https://github.com/teamEPYC)
