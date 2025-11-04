import { Client, ID, TablesDB, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";
import { useLinkClickHandler } from "react-router-dom";

export class Service {
  client = new Client();
  tables;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tables = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, content, featuredImg, userId, slug }) {
    try {
      const post = await this.tables.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          userId,
          featuredImg,
          slug,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
  async updatePost(rowId, { title, content, featuredImg }) {
    try {
      const result = await this.tables.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: rowId,
        data: {
          title,
          content,
          featuredImg,
        },
      });

      return result;
    } catch (error) {
      console.log("error occurred in update post ", error);
    }
  }
  async deletePost(rowId) {
    try {
      const result = await this.tables.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: rowId,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getPost(rowId) {
    try {
      const result = await this.tables.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: rowId,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getPosts() {
    try {
      const result = await this.tables.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
      });

      return result;
    } catch (error) {
      console.log("error occurred in get all post :", error);
    }
  }
  async getPostsQuery(id) {
    const columnName = "userId";
    console.log("DEBUG: Querying posts for userId:", id);
    console.log("DEBUG: Querying on column:", columnName);
    try {
      const result = await this.tables.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries: [
          // Use Query.equal to filter rows where the 'userId' column
          // matches the provided 'id'.
          Query.equal(columnName, [id]),
        ],
      });

      return result;
    } catch (error) {
      console.log("error occurred in get all post :", error);
    }
  }
  async fileUpload(file) {
    try {
      const promise = await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });

      return promise;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteFile(fileId) {
    try {
      const result = await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });

      return result;
    } catch (error) {
      console.log("error occurred in delete file ", error);
    }
  }

  //file Preview is for pain appwrite version only free one is file view

  // async filePreview(fileId) {
  //   try {
  //     const result = this.storage.getFilePreview({
  //       bucketId: conf.appwriteBucketId,
  //       fileId: fileId,
  //     });

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async fileView(fileId) {
    try {
      const result = this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async fileDownload(fileId) {
    try {
      const result = this.storage.getFileDownload({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });

     if(result){ const link = document.createElement("a");
      link.href =result
      link.download =""
      link.click()}
    } catch (err) {
      console.log("error in download file", err);
    }
  }
}
const service = new Service();
export default service;
