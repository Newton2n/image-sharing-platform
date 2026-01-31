import { Client, TablesDB, Storage} from "node-appwrite";
import conf from "@/lib/conf/conf";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    .setKey(process.env.APPWRITE_API_KEY);

  return {
    // Use the new TablesDB class here
    get tables() { return new TablesDB(client); },
    get storage() { return new Storage(client); }
  };
}
