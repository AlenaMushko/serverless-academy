"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonService = void 0;
const errors_1 = require("../errors");
const s3_service_1 = require("./s3.service");
class JsonService {
    async getJson() {
    }
    ;
    async putJson(userId, file) {
        try {
            let filePath = [];
            if (Array.isArray(file)) {
                filePath = await s3_service_1.s3Service.uploadFiles(file, userId);
                console.log('arr', filePath);
            }
            else {
                const singleFilePath = await s3_service_1.s3Service.uploadSingleFile(file, userId);
                filePath.push(singleFilePath);
            }
        }
        catch (err) {
            throw new errors_1.ApiError(err.message, err.status);
        }
    }
    ;
}
exports.jsonService = new JsonService();
