export const Logger = {
    logInfo(tag: string, message: string) {
        console.info(`${tag} |====> ${message}`);
    },

    logError(tag: string, message: string, error: Error) {
        console.error(`${tag} |====> ${message}
Original Error: ${error}`);
    },
};
