"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currentuser = void 0;
const common_1 = require("@nestjs/common");
exports.Currentuser = (0, common_1.createParamDecorator)((data, contex) => {
    const request = contex.switchToHttp().getRequest();
    return request.currentUser;
});
//# sourceMappingURL=current-user.decorator.js.map