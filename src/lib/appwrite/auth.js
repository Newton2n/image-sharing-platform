import conf from "@/lib/conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        name,
        email,
        password,
      });

      if (userAccount) {
        //call login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });

      return session;
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();

      return user;
    } catch (error) {
      throw error;
    }
  }
  async logOut() {
    try {
      const logoutResult = await this.account.deleteSessions(); // Deletes the all device's session
      return logoutResult;
    } catch (error) {
      throw error;
    }
  }
}
const authservice = new AuthService();
export default authservice;
