const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/product", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        return data.msg;  // Adjust the response structure according to your actual backend response
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const ProductService = {
    getProducts,
    // getProductById,
  };

  export default ProductService;


  