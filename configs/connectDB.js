import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connection = await connect(
      `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`
    );
    console.log(`mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
