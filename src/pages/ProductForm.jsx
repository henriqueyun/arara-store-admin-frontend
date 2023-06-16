// TODO: fix: associate label htmlFor with a form control or disable this rule
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Add } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../client';

function ProductForm() {
  const { action, id } = useParams();
  console.log(action, id);

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    size: '',
    color: '',
    price: 0,
    discount: 0,
    images: [],
    description: '',
    quantity: 100,
  });

  const [loading, setLoading] = useState(false);
  const sizes = ['PP', 'P', 'M', 'G', 'GG'];
  const colors = [
    'Azul',
    'Verde',
    'Amarelo',
    'Roxo',
    'Rosa',
    'Vermelho',
    'Laranja',
    'Marrom',
    'Cinza',
    'Branco',
    'Preto',
  ];

  const mockedImageLinks = [
    'https://images.unsplash.com/photo-1671438118097-479e63198629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=877&q=80',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=705&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  ];

  function pickRandomMockedImage() {
    const randomIndex = Math.round(Math.random() + 1);
    return mockedImageLinks[randomIndex];
  }

  function validateFields() {
    const mustBeTruthyFields = {
      name: 'Nome',
      size: 'Tamanho',
      color: 'Cor',
      price: 'Preço',
      discount: 'Desconto',
      description: 'Descrição',
    };

    const productFalsyFields = Object.keys(mustBeTruthyFields).filter(
      (field) => !product[field],
    );

    const falsyFieldNames = productFalsyFields.map(
      (field) => mustBeTruthyFields[field],
    );
    return falsyFieldNames;
  }

  const save = async () => {
    const errors = validateFields();
    if (errors.length) {
      Swal.fire({
        title: 'Campos inválidos',
        text: `Preencha o(s) campo(s): ${errors.join(', ')}.`,
        icon: 'error',
      });
    }
    setLoading(true);
    await client.products.save(product);
    navigate('/products');
  };

  useEffect(() => {
    async function getProduct() {
      const response = await client.products.findById(id);
      setProduct(response)
    }
    if (action === 'edit') {
      getProduct();
    }
  }, [])
  return (
    <Container maxWidth="sm">
      <Grid component="main" sx={{ flexShrink: 0 }} py={4}>
        <Typography variant="h4" sx={{ fontWeight: '1000' }}>
          Cadastro de Produtos
        </Typography>
      </Grid>
      <Grid container flexDirection="column" gap={2}>
        <TextField
          value={product.name}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, name: e.target.value };
            });
          }}
          label="Descrição"
          variant="outlined"
        />
        <TextField
          value={product.brand}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, brand: e.target.value };
            });
          }}
          label="Marca"
          variant="outlined"
        />
        <TextField
          select
          label="Tamanho"
          variant="outlined"
          value={product.size}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, size: e.target.value };
            });
          }}
        >
          {sizes.map((size) => (
            <MenuItem value={size} key={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Cor"
          variant="outlined"
          value={product.color}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, color: e.target.value };
            });
          }}
        >
          {colors.map((color) => (
            <MenuItem value={color} key={color}>
              {color}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label="Preço"
          variant="outlined"
          value={product.price}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, price: parseFloat(e.target.value) };
            });
          }}
        />
        <TextField
          label="Desconto"
          variant="outlined"
          value={product.discount}
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, discount: parseFloat(e.target.value) };
            });
          }}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="file-input-button"
          multiple
          type="file"
          onChange={(e) => {
            setProduct((oldState) => {
              return { ...oldState, images: [...e.target.files] };
            });
          }}
        />
        <Typography>Imagens do Produto</Typography>
        <label htmlFor="file-input-button">
          <IconButton component="span" aria-label="upload_image">
            <Add />
          </IconButton>
        </label>
        <TextField
          id="outlined-multiline-static"
          label="Descrição Detalhada"
          multiline
          rows={4}
          placeholder="Escreva aqui a descrição do produto"
          onChange={(e) =>
            setProduct((oldState) => {
              return { ...oldState, description: e.target.value };
            })
          }
          value={product.description}
        />
        <Grid>
          {!loading ? (
            <Button
              variant="contained"
              onClick={() => {
                setProduct((oldState) => {
                  return {
                    ...oldState,
                    images: [pickRandomMockedImage()],
                  };
                });
                save();
              }}
            >
              Salvar
            </Button>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductForm;
