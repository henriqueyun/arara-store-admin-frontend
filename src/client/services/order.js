const OrderService = (http) => ({
  findAll: async () => {
    const { data } = await http.get('/orders');
    return data;
  },
  findByUser: async (userId) => {
    const { data } = await http.get(`/orders/user/${userId}`);
    return data;
  },
  findOne: async (id) => {
    const { data } = await http.get(`/orders/${id}`);
    return data;
  },
});

export default OrderService;
