import express, { Request, Response } from "express";

import cors from "cors";
import { responseHandler } from "./utils";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => res.send("[+] Polygon NFT"));

// Route for fetching NFT by ID
app.get("/api/v1/nft/:id", async (req: Request, res: Response) => {
  const recordId = req.params.id;

  const tableId = process.env.NFT_TABLE_ID;

  responseHandler({ req, res, tableId, recordId });
});

// Route for fetching NFTs
app.get("/api/v1/nft", async (req: Request, res: Response) => {
  const tableId = process.env.NFT_TABLE_ID;

  responseHandler({ req, res, tableId });
});

// Route for fetching Council members
app.get("/api/v1/council", async (req: Request, res: Response) => {
  const tableId = process.env.COUNCIL_TABLE_ID;

  responseHandler({ req, res, tableId });
});

// Route for fetching Marketplace by ID
app.get("/api/v1/marketplace/:id", async (req: Request, res: Response) => {
  const recordId = req.params.id;

  const tableId = process.env.MARKETPLACE_TABLE_ID;

  responseHandler({ req, res, tableId, recordId });
});

// Route for fetching Marketplace items
app.get("/api/v1/marketplace", async (req: Request, res: Response) => {
  const tableId = process.env.MARKETPLACE_TABLE_ID;

  responseHandler({ req, res, tableId });
});

export default app;
