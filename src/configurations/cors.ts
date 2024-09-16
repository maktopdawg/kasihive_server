import allowedOrigins from "./allowed_origins";

export const corsOptions = {
    origin: (origin: string, callback: (error: Error | null, allowed: boolean) => void) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false);
        };
    },
    optionsSuccessStatus: 200
};