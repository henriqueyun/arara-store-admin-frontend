const ShippingService = (http) => ({
  tracking: async (trackingCode) => {
    const { data } = await http.get(`/orders/tracking/${trackingCode}`);
    return data;
  },
});

export default ShippingService;
