import {
    ListObjectsCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import * as path from "path";

import {configs} from "../config";

class S3Service {
    constructor(
        private s3Client = new S3Client({
            region: configs.AWS_S3_REGION,
            credentials: {
                accessKeyId: configs.AWS_S3_ACCESS_KEY,
                secretAccessKey: configs.AWS_S3_SECRET_ACCESS_KEY,
            },
        }),
    ) {}

    public async uploadFiles( files:any, itemId: string ): Promise<string[]> {
        const filePaths: string[] = [];

        for (const file of files) {
            const filePath = await this.uploadSingleFile(file, itemId);
            filePaths.push(filePath);
        }

        return filePaths;
    }
    public async uploadSingleFile( file:any, itemId: string ): Promise<string> {
        const filePath = this.buildPath(file.name, itemId);

        await this.s3Client.send(
            new PutObjectCommand({
                Key: filePath,
                Bucket: configs.AWS_S3_BUCKET,
                Body: file.data,
                ContentType: file.mimetype,
                ACL: "public-read",
            }),
        );

        return filePath;
    }

    public async getListJson(userId:string):Promise<string[]>{
        const result = await this.s3Client.send(
            new ListObjectsCommand({
            Bucket: configs.AWS_S3_BUCKET,
            Prefix: `${configs.AWS_S3_FILE_PATH}/${userId}/`,
        }));

        return result.Contents?.map(file => file.Key.replace(`${configs.AWS_S3_FILE_PATH}/${userId}/`, '')) ?? [];
    }

    public buildPath( fileName: string, fileId: string ): string {
        return `jsonFile/${fileId}/${crypto.randomUUID()}${path.extname(fileName)}`;
    }
}

export const s3Service = new S3Service();
