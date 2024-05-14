import { Client, Account, ID, Databases, Avatars, Query } from "react-native-appwrite";

// Import .env Variable
export const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
export const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID;
export const TODO_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_TODO_COLLECTION_ID;
export const STORAGE_ID = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID;

let client;
client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID)
  .setPlatform("com.rabbi.goalgalaxy");

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

// =====================================================================================================================
// Authentication
// =====================================================================================================================
export async function login({ email, password }) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Login Failed");

    const user = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
      Query.equal("account_id", session?.userId)
    ]);

    return user.documents[0];
  } catch (error) {
    console.warn(`@ERROR: ${error}`);
    throw error;
  }
}

export async function register({ email, password, name }) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account Creation Failed");

    const avatarUrl = await avatars.getInitials(name);
    await login({ email, password });

    const newUser = await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        account_id: newAccount.$id,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.warn(`@ERROR (register fn.): ${error}`);
    // throw new Error(error);
  }
}

export async function logout() {
  await account.deleteSession("current");
}

export async function getCurrentAccount() {
  try {
    const session = await account.get("current");

    if (!session) throw new Error("Login Failed");

    const user = await databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
      Query.equal("account_id", session?.$id)
    ]);

    return user.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

// =====================================================================================================================
// Appwrite Db Operation
// =====================================================================================================================
export const getTodos = async creatorId => {
  try {
    const todos = await databases.listDocuments(
      DATABASE_ID,
      TODO_COLLECTION_ID,
        [
          Query.equal("creator", creatorId),
          Query.equal("is_completed", false)
        ]
      
    );
    
    if (!todos.documents) throw Error;
    
    return todos.documents.reverse();
  } catch (error) {
    console.error(`@Error Occured While Fetching Todos. Cause: ${error}`);
    throw new Error(error);
  }
};

export const getTodoById = async ({ creatorId, todoId }) => {
  try {
    const todo = await databases.listDocuments(DATABASE_ID, TODO_COLLECTION_ID, [
      Query.equal("creator", creatorId),
      Query.equal("$id", todoId)
    ]);

    if (!todo.documents[0]) throw Error;

    return todo.documents[0];
  } catch (error) {
    console.error(`@Error Occured While Fetching Todos. Cause: ${error}`);
    throw new Error(error);
  }
};

export const createTodo = async ({ title, desc, creator }) => {
  try {
    const newTask = await databases.createDocument(
      DATABASE_ID,
      TODO_COLLECTION_ID,
      ID.unique(),
      {
        title,
        desc,
        creator
      }
    );

    if (!newTask) throw Error;

    return newTask;
  } catch (error) {
    console.error(`@Error Occured While Creating Todo. Cause: ${error}`);
    throw new Error(error);
  }
};

export const updateTodo = async data => {
  try {
    const updatedTodo = await databases.updateDocument(
      DATABASE_ID,
      TODO_COLLECTION_ID,
      data.todoId,
      {
        title: data.title,
        desc: data.desc
      }
    );

    if (!updatedTodo) throw Error;

    return updatedTodo;
  } catch (error) {
    console.error(`@Error Occured While Updating Todo. Cause: ${error}`);
    throw new Error(error);
  }
};

export const completeTodo = async todoId => {
  try {
    const updatedTodo = await databases.updateDocument(
      DATABASE_ID,
      TODO_COLLECTION_ID,
      todoId,
      {
        is_completed: true
      }
    );

    if (!updatedTodo) throw Error;

    return updatedTodo;
  } catch (error) {
    console.error(`@Error Occured While Updating Todo. Cause: ${error}`);
    throw new Error(error);
  }
};

export const deleteTodo = async todoId => {
  try {
    const deletedTodo = await databases.deleteDocument(
      DATABASE_ID,
      TODO_COLLECTION_ID,
      todoId
    );

    return deletedTodo;
  } catch (error) {
    console.error(`@Error Occured While Deleting Todo. Cause: ${error}`);
    throw new Error(error);
  }
};
