import {Document} from "mongoose";

export interface IUrl extends Document {
    _id: string;
    origUrl: string;
    shortUrl: string;
}
