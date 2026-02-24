"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const zod_1 = require("zod");
const schema_1 = require("./schema");
exports.api = {
    contact: {
        submit: {
            method: "POST",
            path: "/api/contact",
            input: schema_1.insertContactInquirySchema,
            responses: {
                200: zod_1.z.object({ success: zod_1.z.boolean() }),
                400: zod_1.z.object({ message: zod_1.z.string() }),
            },
        },
    },
};
