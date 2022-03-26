import { client } from "./index.js";

export async function getProductById(id) {
    return await client.db("webscrapping").collection("products").findOne({ id: "id" });
}
export async function getUserByName(username) {
    return await client.db("webscrapping").collection("users").findOne({username: username });
}
export async function createProducts(data) {
    return await client.db("webscrapping").collection("products").insertMany(data);
}

export async function createUser(data) {
    return await client.db("webscrapping").collection("users").insertOne(data);
}

export async function updateProductsById(Id,updateData) {
    return await client.db("webscrapping").collection("products").updateOne({ id: "id" }, { $set: updateData });
}

export async function deleteProductById(id) {
    return await client.db("webscrapping").collection("products").deleteOne({ id: "id" });
}

export async function getAllProduct() {
    return await client.db("webscrapping").collection("products").find({}).toArray();
}