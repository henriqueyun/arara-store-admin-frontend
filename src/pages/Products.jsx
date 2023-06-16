import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { client } from '../client';

function Products() {
  const [products, setProducts] = useState([]);
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
        <Typography variant="h4">Roupas</Typography>
        <Grid container py={4} spacing={1}>
          <Grid item>
            <Button variant="contained">Adicionar</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Atualizar</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Desabilitar</Button>
          </Grid>
        </Grid>
        <Grid container>
          {products.length ? (
            products.map((product) => <Product product={product} />)
          ) : (
            <Typography>Não há produtos cadastrados</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

function Product({ product }) {
  const [isHovered, setisHovered] = useState(false);
  const backgroundColor = isHovered && '#EFEFEF';

  return (
    <Grid item>
      <Grid
        onMouseLeave={() => setisHovered(false)}
        onMouseEnter={() => setisHovered(true)}
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
