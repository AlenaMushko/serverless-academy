import {ApiError} from "../errors";
import {s3Service} from "./s3.service";


class JsonService {
    public async getJson  (){

    };

    public async putJson (userId:string, file:any):Promise<void> {
        try {
            let filePath:string[] = [];
            if (Array.isArray(file)) {
                filePath = await s3Service.uploadFiles( file, userId );
                console.log('arr', filePath)
            } else {
                const singleFilePath = await s3Service.uploadSingleFile( file, userId );
                filePath.push(singleFilePath);
            }

            // console.log(filePath)
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };
}

export const jsonService = new JsonService();
