import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0';

export const client = new MongoClient(url)

export async function runDb() {
  try {
    await client.connect();
    await client.db('products').command({ ping: 1 });

    console.log('Connected to Mongo');
  } catch {
    await client.close();
  }
}

