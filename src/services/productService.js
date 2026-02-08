import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/products';

const productService = {
    getAllProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching products", error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}`, error);
            throw error;
        }
    },

    getFeaturedProducts: async () => {
        try {
            // For now, just get all and slice, or implement a featured endpoint
            const response = await axios.get(API_URL);
            // Handle { success: true, data: { products: [], count: 0 } }
            if (response.data.data && response.data.data.products && Array.isArray(response.data.data.products)) {
                return response.data.data.products.slice(0, 4);
            }
            // Handle { success: true, data: [] }
            if (response.data.data && Array.isArray(response.data.data)) {
                return response.data.data.slice(0, 4);
            }
            return [];
        } catch (error) {
            console.error("Error fetching featured products", error);
            return [];
        }
    },

    createProduct: async (productData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(API_URL, productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating product", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error deleting product with id ${id}`, error);
            throw error;
        }
    },
};

export default productService;
