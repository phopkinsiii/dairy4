// @ts-nocheck
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res, next) => {
	try {
		const page = Number(req.query.page) || 1; //Default page size
		const pageSize = Number(req.query.pageSize) || 10

		//Calculate the number of products to skip for the current page
		const skip = (page - 1) * pageSize;

		//Fetch products with pagination
		const products = await Product.find().skip(skip).limit(pageSize);

		// Get the total number of products for calculating the number of pages
		const totalProducts = await Product.countDocuments();

		res.status(200).json({
			products,
			page,
			pageSize,
			totalPages: Math.ceil(totalProducts / pageSize),
			totalProducts,
		});
	} catch (error) {
		next(error);
	}
};

export const getSingleProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(404)
				.json({ message: 'That is not a valid product id' });
		}
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ message: 'Product Not Found' });
		}
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};

//Protected, Admin Only Routes
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, priceOptions, imageSrc, category, imageAlt, stock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      priceOptions,
      category,
      imageSrc,
      imageAlt,
      stock,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: 'Product Created', newProduct });
  } catch (error) {
    next(error);
  }
};


//Update Product
export const updateProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ message: 'That is not a valid product id' });
		}
		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		Object.assign(product, req.body);
		await product.save();
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};

//Delete Product
export const deleteProduct = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res
				.status(400)
				.json({ message: 'That is not a valid product id.' });
		}
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ message: 'Product Not Found' });
		}
		await product.deleteOne();
		res.status(200).json({ message: 'Product Deleted' });
	} catch (error) {
		next(error);
	}
};
