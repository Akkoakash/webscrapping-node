import express from "express";
import { getProductById, createProducts, updateProductsById, deleteProductById, getAllProduct } from "./helper.js.js";
import{auth}from "../middleware/auth.js"
const router = express.Router();

router.get('/',auth, async function (request, response) {

    const movies = await getAllProducts();
response.send(products);
});

router.get('/:id', async function (request, response) {
    console.log(request.params);
    
    const { id } = request.params;
    
   const product = await getProductById(id);
   console.log(product);
   movie
   ? response.send(product)
   :response.status(404).send({ message: "No such product found!!"});
});

router.delete('/:id', async function (request, response) {
    console.log(request.params);
    const { id } = request.params;
    const result = await deleteProductById(id);
    response.send(result);
});

router.put('/:id', async function (request, response) {
    console.log(request.params);
    const { id } = request.params;
    const updateData = request.body;
    const result = await updateProductById(Id,updateData);
    response.send(result);
    });

    router.post('/:id', async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await createProducts(data);
    response.send(products);
    });

    export const productsRouter = router;