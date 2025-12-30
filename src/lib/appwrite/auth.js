
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
  async createAccount({ name,email, password }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        name,
        email,
        password
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
        email :email,
        password :password
      });
  
      return session;
    } catch (error) {
      console.log("log in failed ",error)
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      
      return user;
    } catch (err) {
     console.log("user is not available",err)
    }
    return null
   
  }
  async logOut() {
    try {
      await this.account.deleteSessions(); // Deletes the all device's session
      console.log("User logged out successfully.");
    } catch (error) {
      console.log(error,"I think You are already logged in please tap on log out")
    }
  }
   
}
const authservice = new AuthService();
export default authservice;
