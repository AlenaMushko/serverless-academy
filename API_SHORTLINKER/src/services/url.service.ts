import { v4 as uuidv4 } from 'uuid';

import {urlRepository} from "../repositories";
import {ApiError} from "../errors";
import {configs} from "../config";

class UrlService {
    public async shortUrl(url: string): Promise<string> {
        try {
            const id = uuidv4();
            const newShortUrl = `${configs.BASE_FOR_SHORT_URL}/${id}`
            const createdUrl = await urlRepository.createUrl(id, url, newShortUrl);

            return createdUrl.shortUrl;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

}

export const urlService = new UrlService();
