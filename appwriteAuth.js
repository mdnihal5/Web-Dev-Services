import conf from "../config/conf";
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
  // New Account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        console.log(userAccount);
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite Service :: CreateAccount :: error");
      throw error;
    }
  }
  // Login
  async login({ email, password }) {
    try {
      console.log(email, password);
      await this.account.createEmailSession(email, password);
      return 1;
    } catch (error) {
      console.log("Appwrite Service :: Login :: error");
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }
  // Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;