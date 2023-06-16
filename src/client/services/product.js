const ProductService = (http) => ({
  save: async (product) => {
    const { data } = await http.post('/products', product);
    return data;
  },
  findAll: async () => {
    const { data } = await http.get('/products');
    return data;
  },
  findById: async (id) => {
    const { data } = await http.get(`/products/${id}`);
    return data;
  },
  setShowCase: async (products) => {
    const { data } = await http.post(`/products/showCase`, products);
    return data;
  },
});

export default ProductService;
