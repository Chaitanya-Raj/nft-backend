import Airtable = require("airtable");
import { Request, Response } from "express";

interface QueryParams {
  filter?: string;
  sort?: string;
}

export const fetchRecordsFromAirtable = async ({
  req,
  tableId,
}: {
  req: Request;
  tableId: string;
}) => {
  try {
    const token = process.env.AIRTABLE_API_KEY;

    Airtable.configure({ apiKey: token });

    const baseId = process.env.AIRTABLE_BASE_ID;

    let mappedRecords;

    const { sort: sortField, filter }: QueryParams = req.query;

    if (baseId && tableId) {
      const base = Airtable.base(baseId);

      const fetchOptions: any = {
        // returnFieldsByFieldId: true,
      };

      if (sortField) {
        // sorts the results over the given field in ascending order
        fetchOptions.sort = [{ field: sortField }];
      }
      if (filter) {
        fetchOptions.filterByFormula = filter;
      }

      const fetchedRecords = await base(tableId).select(fetchOptions).all();

      mappedRecords = fetchedRecords.map((record) => {
        return { id: record.id, ...record.fields };
      });
    }

    return {
      records: mappedRecords,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchSingleRecordFromAirtable = async ({
  req,
  tableId,
  recordId,
}: {
  req: Request;
  tableId: string;
  recordId: string;
}) => {
  try {
    const token = process.env.AIRTABLE_API_KEY;

    Airtable.configure({ apiKey: token });

    const baseId = process.env.AIRTABLE_BASE_ID;

    let mappedRecord;

    if (baseId && tableId && recordId) {
      const base = Airtable.base(baseId);

      const fetchedRecord = await base(tableId).find(recordId);

      mappedRecord = { id: fetchedRecord.id, ...fetchedRecord.fields };
    }
    return { record: mappedRecord };
  } catch (error: any) {
    throw new Error(error);
  }
};

// Helper function to set response headers
const responseHeaders = {
  "Content-Type": "application/json",
};

export const responseHandler = async ({
  req,
  res,
  tableId,
  recordId,
  filter,
  sort,
}: {
  req: Request;
  res: Response;
  tableId?: string;
  recordId?: string;
  filter?: string;
  sort?: string;
}) => {
  try {
    if (tableId) {
      let data;
      if (recordId) {
        const record = await fetchSingleRecordFromAirtable({
          req,
          tableId,
          recordId,
        });
        data = record;
      } else {
        const records = await fetchRecordsFromAirtable({
          req,
          tableId,
        });
        data = records;
      }

      res.set(responseHeaders).json(data);
    } else {
      res.status(400).send("No tableId provided");
    }
  } catch (error) {
    console.error("Encountered an error: ", error);
    res.status(500).json(error);
  }
};
