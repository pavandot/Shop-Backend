import { Response, Request } from 'express';
import { CreateBrandInput } from '../schema/brand.schema';
import { addBrand } from '../services/brand.service';

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
