import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  TableHead,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import Swal from 'sweetalert2';
import { client } from '../client';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Descrição',
  },
  {
    id: 'color',
    numeric: true,
    disablePadding: false,
    label: 'Cor',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Tamanho',
  },
  {
    id: 'brand',
    numeric: true,
    disablePadding: false,
    label: 'Marca',
  },
];

function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produtos
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton />
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function Showcase() {
  const [selected, setSelected] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSubmit = async () => {
    const response = await client.products.setShowcase(selected);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Vitrine cadastrada com sucesso!',
        didClose: () => {
          window.location.reload();
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Falha ao salvar!',
      });
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const response = await client.products.findAll();
      setProducts(response);
    };
    getOrders();
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={products.length}
            />

            <TableBody>
              {products.map((product) => {
                const isItemSelected = isSelected(product.id);
                const labelId = `enhanced-table-checkbox-${product.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, product.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={product.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell id={labelId} align="center">
                      {product.name}
                    </TableCell>
                    <TableCell id={labelId} align="center">
                      {product.description}
                    </TableCell>
                    <TableCell id={labelId} align="center">
                      {product.color}
                    </TableCell>
                    <TableCell id={labelId} align="center">
                      {product.size}
                    </TableCell>
                    <TableCell id={labelId} align="center">
                      {product.brand}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <Button onClick={handleSubmit}>Salvar</Button>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
