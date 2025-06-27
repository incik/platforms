//import { Redis } from '@upstash/redis';
import { createClient } from "redis";

export const redis = await createClient({ url: "redis://localhost:6379" })
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
