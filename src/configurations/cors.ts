import allowedOrigins from "./allowed_origins";

export const corsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allowed: boolean) => void) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false);
        };
    },
    optionsSuccessStatus: 200
};