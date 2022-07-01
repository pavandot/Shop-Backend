import { Response, Request } from 'express';
import { CreateBrandInput } from '../schema/brand.schema';
import { addBrand, deleteBrand, deleteBrands, getBrandByUserId, getBrands } from '../services/brand.service';

export const addBrandHandler = async (req: Request<{}, {}, CreateBrandInput['body']>, res: Response) => {
	try {
		const userId = req.user._id;
		const brand = await addBrand(userId, req.body);

		if (!brand) {
			return res.status(400).send('Brand already exist');
		}

		res.status(200).json({
			message: 'Brand created successfully',
			data: brand,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const getBrandsHandler = async (req: Request, res: Response) => {
	try {
		const brands = await getBrands();
		if (!brands) {
			return res.status(400).send('No brands found');
		}
		res.status(200).json({
			message: 'Brands found successfully',
			data: brands,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const getBrandByUserIdHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const brand = await getBrandByUserId(userId);
		if (!brand) {
			return res.status(400).json({
				message: 'No brand found',
			});
		}
		res.status(200).json({
			message: 'Brand found successfully',
			data: brand,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const deleteBrandsHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const brand = await deleteBrands(userId);
		if (!brand) {
			return res.status(400).json({
				message: 'No brand found',
			});
		}
		res.status(200).json({
			message: 'Brands deleted successfully',
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const deleteBrandHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const brandId = req.params.brandId;
		const brand = await deleteBrand(userId, brandId);
		if (!brand) {
			return res.status(400).json({
				message: 'No brand found',
			});
		}
		res.status(200).json({
			message: 'Brand deleted successfully',
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};
