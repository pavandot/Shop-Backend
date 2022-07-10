import ProductModel from '../models/product.model';
import { Request, Response } from 'express';
import { CreateProductInput } from '../schema/product.schema';

export const getProducts = async (req: Request, res: Response) => {
	const products = await ProductModel.find();
	res.status(200).json({
		statusCode: 200,
		products,
	});
};

export const addProduct = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
	try {
		const productBody = req.body;
		const productValidation = await ProductModel.findOne({ name: productBody.name, brand: productBody.brand });
		if (productValidation) {
			return res.status(400).json({
				statusCode: 400,
				message: 'Product already exists',
			});
		}
		const product = await ProductModel.create(productBody);
		res.status(201).json({
			statusCode: 201,
			data: product,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await ProductModel.findById(req.params.id);
		if (!product) {
			return res.status(400).json({
				statusCode: 400,
				message: 'Product not found',
			});
		}
		res.status(200).json({
			statusCode: 200,
			data: product,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const product = await ProductModel.findByIdAndDelete(req.body.productId);
		if (!product) {
			return res.status(400).json({
				statusCode: 400,
				message: 'Product not found',
			});
		}
		res.status(200).json({
			statusCode: 200,
			data: product,
			message: 'Product deleted successfully',
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};
