# Zod Data Validation Implementation

This project now uses Zod for runtime type validation of API responses and other data sources.

## Overview

Zod is a TypeScript-first schema validation library that provides:

- Runtime type checking
- Automatic TypeScript type inference
- Detailed error messages
- Schema composition and transformation

## Files Added/Modified

### New Files

- `src/schemas.ts` - Contains all Zod schemas and validation functions
- `src/components/DataValidationExample.tsx` - Example component demonstrating validation usage
- `ZOD_VALIDATION.md` - This documentation file

### Modified Files

- `src/store.ts` - Updated to use Zod validation for API responses
- `package.json` - Added Zod dependency

## Schemas

### ProductItemSchema

Validates individual product items from the API:

```typescript
export const ProductItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  creator: z.string().min(1, 'Creator name is required'),
  imagePath: z.string().url('Invalid image URL').or(z.string().min(1, 'Image path is required')),
  pricingOption: z.number().int().min(0).max(2, 'Invalid pricing option'),
  price: z.number().positive('Price must be positive').optional(),
});
```

### ProductListSchema

Validates the entire API response (array of product items):

```typescript
export const ProductListSchema = z.array(ProductItemSchema);
```

## Validation Functions

### 1. validateApiResponse(data: unknown)

Throws an error if validation fails. Use when you want to fail fast on invalid data.

```typescript
try {
  const validatedData = validateApiResponse(apiResponse);
  // Process validated data
} catch (error) {
  // Handle validation error
}
```

## Usage in Store

The `useProductStore` now uses safe validation with fallback to filtering:

1. First attempts strict validation of the entire response
2. If that fails, filters out invalid items and processes valid ones
3. Logs warnings for invalid items
4. Provides detailed error messages

## Benefits

1. **Type Safety**: Runtime validation ensures data matches expected types
2. **Error Handling**: Detailed error messages help debug API issues
3. **Graceful Degradation**: Can handle partial data corruption
4. **Developer Experience**: Automatic TypeScript type inference
5. **Maintainability**: Centralized validation logic

## Example Usage

```typescript
import { ProductItemSchema, safeValidateApiResponse } from './schemas';

// Validate single item
const itemValidation = ProductItemSchema.safeParse(someData);
if (itemValidation.success) {
  const validItem = itemValidation.data;
  // Use validItem
}

// Validate API response
const response = await fetch('/api/products');
const data = await response.json();
const validation = safeValidateApiResponse(data);

if (validation.success) {
  // All data is valid
  const products = validation.data;
} else {
  // Handle validation error
  console.error(validation.error);
}
```

## Best Practices

1. **Always validate external data**: Never trust API responses
2. **Use safe validation for user-facing features**: Prefer `safeParse` over `parse`
3. **Log validation errors**: Help debug API issues in production
4. **Provide fallbacks**: Handle partial data corruption gracefully
5. **Keep schemas up to date**: Update schemas when API contracts change
