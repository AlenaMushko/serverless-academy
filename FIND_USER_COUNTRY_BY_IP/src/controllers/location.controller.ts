import {NextFunction, Request, Response} from "express";

import {IUserLocation} from "../types";
import {ApiError} from "../errors";
import {locationService} from "../services";

class LocationController {
    public async userLocation(req: Request, res: Response, next: NextFunction): Promise<Response<IUserLocation>> {
        try {
            const ipAddress = res.locals.ipAddress;

            const data = await locationService.transformationCSV();
            const userIp = await locationService.getIpUser(ipAddress);

            const locationData = locationService.findLocationByIP(userIp, data);
            if (locationData === null) {
                return res.status(404).json('Location not found for this IP');
            }

            const result = {
                "Address range": `[${locationData.From} - ${locationData.To}]`,
                "Country": locationData.Country
            };

            console.log(result)
            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            throw new ApiError('Location not found for this IP', 404)
        }
    }
}

export const countryController = new LocationController();
