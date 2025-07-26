import { z } from 'zod';

// Schema for individual product item from API
export const ProductItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  creator: z.string().min(1, 'Creator name is required'),
  imagePath: z.string().url('Invalid image URL').or(z.string().min(1, 'Image path is required')),
  pricingOption: z.number().int().min(0).max(2, 'Invalid pricing option'), // 0: paid, 1: free, 2: viewOnly
  price: z.number().positive('Price must be positive'),
});

// Schema for the entire API response (array of product items)
export const ProductListSchema = z.array(ProductItemSchema);

// Type inference from the schema
export type ApiProductItem = z.infer<typeof ProductItemSchema>;
export type ApiProductList = z.infer<typeof ProductListSchema>;

// Validation function for API response
export function validateApiResponse(data: unknown): ApiProductList {
  try {
    return ProductListSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('API data validation failed:', error.issues);
      throw new Error(`Invalid API response: ${error.issues.map((e) => e.message).join(', ')}`);
    }
    throw error;
  }
}
