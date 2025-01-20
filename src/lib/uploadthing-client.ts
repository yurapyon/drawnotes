import { generateSolidHelpers } from "@uploadthing/solid";
import type { UploadRouter } from "~/server/uploads/uploadthing";
import { getBaseUrl } from "./utils/getBaseUrl";

export const uploadthingClient = generateSolidHelpers<UploadRouter>({
  url: getBaseUrl(),
});
