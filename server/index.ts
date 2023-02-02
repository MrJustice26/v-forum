import {Nitro} from 'nitropack';
import mongoose from 'mongoose';


export default async (_nitroApp: Nitro ) => {

    const config = useRuntimeConfig();

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(encodeURI(`mongodb+srv://${config.mongodbUsername}:${config.mongodbPassword}@cluster0.2ob1vjb.mongodb.net/?retryWrites=true&w=majority`));
        console.log("Connected to MongoDB")
    } catch(e){
        console.error(e);
    }

}