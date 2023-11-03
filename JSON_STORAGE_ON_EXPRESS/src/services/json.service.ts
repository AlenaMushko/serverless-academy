import {ApiError} from "../errors";
import {s3Service} from "./s3.service";
import {configs} from "../config";

class JsonService {
    public async getListJson(userId: string):Promise<string[]> {
        try {
            const fileKeys = await s3Service.getListJson(userId);
            return fileKeys;
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };

    public async getJson(path: string):Promise<string> {
        try {
            const righrPath = path.replace('listFiles/', '');
            const filePath = `${configs.AWS_S3_URL}${configs.AWS_S3_FILE_PATH}${righrPath}`

            return filePath;
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };

    public async putJson(userId: string, file: any): Promise<void> {
        try {
            let filePath: string[] = [];
            if (Array.isArray(file)) {
                filePath = await s3Service.uploadFiles(file, userId);
            } else {
                const singleFilePath = await s3Service.uploadSingleFile(file, userId);
                filePath.push(singleFilePath);
            }
        } catch (err) {
            throw new ApiError(err.message, err.status)
        }
    };
}

export const jsonService = new JsonService();
