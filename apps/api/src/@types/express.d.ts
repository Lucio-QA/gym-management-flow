import { JwtPayload } from "../../src/shared/middlewares/auth.middleware.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}