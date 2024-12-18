export const Logger = {
    logInfo(tag: string, message: string) {
        console.info(`${tag} |====> ${message}`);
    },

    logError(tag: string, message: string, error: Error) {
        console.error(`${tag} |====> ${message}
Original Error: ${error}`);
    },

    logDebug(tag: string, message: string) {
        console.debug(`${tag} |====> ${message}
!!!REMOVE BEFORE COMMITTING!!!`);
    },
};
