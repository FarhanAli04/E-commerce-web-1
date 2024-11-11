import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                style={{ height: 200, objectFit: 'contain' }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>{product.title}</Typography>
                <Typography variant="body2" color="textSecondary">{product.category}</Typography>
                <Typography variant="h6">${product.price}</Typography>
              </CardContent>
              <Box padding={2}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" fullWidth>
                    View Details
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
