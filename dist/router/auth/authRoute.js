"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../controllers/auth/auth");
exports.default = (router) => {
    router.get('/auth', auth_1.test);
};
//# sourceMappingURL=authRoute.js.map