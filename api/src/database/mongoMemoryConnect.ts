import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const dbConnect = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose
    .connect(uri, mongooseOpts)
    .then(() => console.log("info", "connected to memory-server"))
    .catch(() => console.log("error", "could not connect"));
};

export const dbDisconnect = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
