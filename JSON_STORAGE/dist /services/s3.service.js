"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../config");
class S3Service {
    constructor(s3Client = new client_s3_1.S3Client({
        region: config_1.configs.AWS_S3_REGION,
        credentials: {
            accessKeyId: config_1.configs.AWS_S3_ACCESS_KEY,
            secretAccessKey: config_1.configs.AWS_23_SECRET_ACCESS_KEY,
        },
    })) {
        this.s3Client = s3Client;
    }
    async uploadFiles(files, itemId) {
        const filePaths = [];
        for (const file of files) {
            const filePath = await this.uploadSingleFile(file, itemId);
            filePaths.push(filePath);
        }
        console.log(filePaths);
        return filePaths;
    }
    async uploadSingleFile(file, itemId) {
        console.log('file.data====>', file);
        console.log('file.body====>', file.filepath);
        const filePath = this.buildPath(file.originalFilename, itemId);
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Key: filePath,
            Bucket: config_1.configs.AWS_S3_BUCKET,
            Body: file.filepath,
            ContentType: file.mimetype,
            ACL: "public-read",
        }));
        return filePath;
    }
    buildPath(fileName, fileId) {
        return `jsonFile/${fileId}/${crypto_1.default.randomUUID()}${path_1.default.extname(fileName)}`;
    }
}
exports.s3Service = new S3Service();
