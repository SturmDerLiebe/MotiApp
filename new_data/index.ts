import type { BaseRepositoryConstructorParam } from "motidata";
import { GroupRepository, UserRepository } from "motidata";
import { SessionRepository } from "./customRepositories/SessionRepository";

const REPO_ARGS: BaseRepositoryConstructorParam = {
    apiBaseUrl: "https://my.api.mockaroo.com",
    publicApiKey: process.env.EXPO_PUBLIC_MOCKAROO_KEY ?? "",
    sessionRepository: new SessionRepository(),
};

export const UserRepositoryInstance = new UserRepository(REPO_ARGS);
export const GroupRepositoryInstance = new GroupRepository(REPO_ARGS);
