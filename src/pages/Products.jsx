import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { client } from '../client';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    async function getProducts() {
      const productsResponse = await client.products.findAll();
      setProducts(productsResponse);
    }
    getProducts();
  }, []);

  return (
    <Container maxWidth="false">
      <Grid component="main" sx={{ flexShrink: 0 }} p={4}>
        <Typography variant="h4" sx={{ fontWeight: '1000' }}>
          Roupas
        </Typography>
        <Grid container py={4} spacing={1}>
          <Grid item>
            <Button href="/products/new" variant="contained">
              Adicionar
            </Button>
          </Grid>
          <Grid item>
            <Button
              href={`/products/edit/${selectedProduct.id}`}
              disabled={!selectedProduct}
              variant="contained"
            >
              Atualizar
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!selectedProduct} variant="contained">
              Desabilitar
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          {products.length ? (
            products.map((product) => (
              <Product
                onClick={setSelectedProduct}
                product={product}
                isSelected={product.id === selectedProduct.id}
              />
            ))
          ) : (
            <Typography>Não há produtos cadastrados</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function Product({ product, isSelected, onClick }) {
  const [isHovered, setisHovered] = useState(false);
  const backgroundColor = isHovered ? '#EFEFEF' : isSelected && '#EAEAEA';

  return (
    <Grid item>
      <Grid
        onMouseLeave={() => setisHovered(false)}
        onMouseEnter={() => setisHovered(true)}
        onClick={() => {
          onClick(product);
        }}
        p={2}
        sx={{
          backgroundColor,
          width: '220px',
        }}
      >
        <img
          style={{ height: '290px', width: '100%' }}
          src={product?.images[0]?.imageUrl}
          alt={product?.description}
        />
        <Typography>{product?.name}</Typography>
      </Grid>
    </Grid>
  );
}

export default Products;
