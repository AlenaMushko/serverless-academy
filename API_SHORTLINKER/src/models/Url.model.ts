import { model, Schema } from "mongoose";

import { IUrl } from "../types";

const urlSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    origUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UrlModel = model<IUrl>("url", urlSchema);
