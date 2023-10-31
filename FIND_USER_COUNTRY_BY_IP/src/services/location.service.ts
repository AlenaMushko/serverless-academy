import path from "path";
import fs from "fs";
import csvParser from "csv-parser";

import {ICSV} from "../types";
import {ApiError} from "../errors";

class LocationService {
    public async transformationCSV (): Promise<ICSV[]>  {
        return new Promise((resolve, reject) => {
            try {
                const csvPath = path.join(__dirname, "..", "countryIP.CSV");
                let result: ICSV[] = [];

                fs.createReadStream(csvPath)
                    .pipe(csvParser(['From', 'To', 'CN', 'Country']))
                    .on("data", (data) => {
                        result.push(data);
                    })
                    .on("end", () => {
                        resolve(result);
                    })
                    .on("error", (error) => {
                        reject(error);
                    });
            } catch (e) {
                reject(e);
                throw new ApiError("Failed to transform CSV", 500)
            }
        });
    }

    public getIpUser = async (userIp: string): Promise<string | undefined> => {
        try {
            const correctIp = userIp.replaceAll('.', '');

            return correctIp;
        } catch (e) {
            console.log(e);
            throw new ApiError("Server Error", 500)
        }
    }


    public findLocationByIP(ip: string, data: ICSV[]): ICSV | null {
        let locationData = null;
        for (let value of data) {
            if (+value.From <= +ip && +ip <= +value.To) {
                locationData = value
            }
        }
        return locationData;
    }
}

export const locationService = new LocationService();
