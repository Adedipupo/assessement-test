import mongoose from 'mongoose';
import winston, { format } from 'winston';

const logger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: [
    new winston.transports.Console(),
  ],
});

const connectDB = () => {
  const url: string =  process.env.DATABASE_URL as string;
  mongoose.connect(url!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    server: {
        poolSize: Number(process.env.POOL_SIZE!)
    }
})
.then((res) => {
    console.log(
        'Connected to Distribution API Database - Initial Connection'
    );
})
.catch((err) => {
    console.log(
        `Initial Distribution API Database connection error occured -`,
        err
    );
});
};
export default connectDB;

