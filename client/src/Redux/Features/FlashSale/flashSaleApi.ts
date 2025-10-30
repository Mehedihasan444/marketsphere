import { baseApi } from '../../Api/baseApi';

export const flashSaleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFlashSales: builder.query({
            query: () => '/flash-sales',
            providesTags: ['flashSale'],
        }),
        getFlashSaleItemById: builder.query({
            query: (id) => `/flash-sales/${id}`,
            providesTags: ['flashSale'],
        }),
        addFlashSale: builder.mutation({
            query: (data) => ({
                url: '/flash-sales',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['flashSale'],
        }),
        updateFlashSale: builder.mutation({
            query: ({ id, data }) => ({
                url: `/flash-sales/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['flashSale'],
        }),
        addFlashSaleItem: builder.mutation({
            query: (data) => ({
                url: '/flash-sales/add-product',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['flashSale'],
        }),
        deleteFlashSale: builder.mutation({
            query: (id) => ({
                url: `/flash-sales/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['flashSale'],
        }),
        deleteFlashSaleItem: builder.mutation({
            query: (id) => ({
                url: `/flash-sales/delete-product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['flashSale'],
        }),
        getVendorFlashSaleProducts: builder.query({
            query: () => '/flash-sales/vendor/products',
            providesTags: ['flashSale'],
        }),
        getFlashSaleProducts: builder.query({
            query: ({ page, limit, minPrice, maxPrice, brand, rating, sortBy }) => {
                const params = new URLSearchParams();
                if (page !== undefined) params.append('page', page);
                if (limit !== undefined) params.append('limit', limit);
                if (minPrice !== undefined) params.append('minPrice', minPrice);
                if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
                if (brand !== undefined) {
                    if (Array.isArray(brand)) {
                        brand.forEach((b) => params.append('brand', b));
                    } else {
                        params.append('brand', brand);
                    }
                }
                if (rating !== undefined) params.append('rating', rating);
                if (sortBy !== undefined) params.append('sortBy', sortBy);
                const queryString = params.toString();
                return `/flash-sales/products${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['flashSale'],
        }),
    }),
});

export const { useGetFlashSalesQuery, useGetFlashSaleItemByIdQuery,
    useAddFlashSaleItemMutation, useUpdateFlashSaleMutation,
    useDeleteFlashSaleItemMutation,
    useAddFlashSaleMutation,
    useGetVendorFlashSaleProductsQuery,
    useDeleteFlashSaleMutation,
    useGetFlashSaleProductsQuery
} = flashSaleApi;