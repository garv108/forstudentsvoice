import { z } from "zod";
import { insertContactInquirySchema } from "./schema";

export const api = {
  contact: {
    submit: {
      method: "POST",
      path: "/api/contact",
      input: insertContactInquirySchema,
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
