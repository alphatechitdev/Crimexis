import moongose from 'mongoose';


const connectToMongoose = async () => {
    try {
        await moongose.connect(process.env.MONGO_URI as string, {
            dbName:'prime1'
        });
        console.log("Mongoose Connection Successful!");
    } catch (error) {
        console.error("Mongoose Connection Failure, ", error);
        process.exit(1);
    }
} 


export default connectToMongoose;