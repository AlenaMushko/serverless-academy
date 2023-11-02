import crypto from "crypto";
import path from "path";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

import {configs} from "../config";

class S3Service {
    constructor(
        private s3Client = new S3Client({
            region: configs.AWS_S3_REGION,
            credentials: {
                accessKeyId: configs.AWS_S3_ACCESS_KEY,
                secretAccessKey: configs.AWS_23_SECRET_ACCESS_KEY,
            },
        }),
    ) {}

    public async uploadFiles( files:any, itemId: string ): Promise<string[]> {
        const filePaths: string[] = [];

        for (const file of files) {
            const filePath = await this.uploadSingleFile(file, itemId);
            filePaths.push(filePath);
        }
        console.log(filePaths)
        return filePaths;
    }
    public async uploadSingleFile( file:any, itemId: string ): Promise<string> {
        // console.log(file.newFilename)
        console.log('file.data====>', file)
        console.log('file.body====>',file.filepath)

        const filePath = this.buildPath(file.originalFilename, itemId);

        await this.s3Client.send(
            new PutObjectCommand({
                Key: filePath,
                Bucket: configs.AWS_S3_BUCKET,
                Body: file.filepath,
                ContentType: file.mimetype,
                ACL: "public-read",
            }),
        );

        return filePath;
    }

    public buildPath( fileName: string, fileId: string ): string {
        return `jsonFile/${fileId}/${crypto.randomUUID()}${path.extname(fileName)}`;
    }
}

export const s3Service = new S3Service();
