import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Button, Grid } from '@mui/material';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  if (error) return <div>Error loading product details. Please try again later.</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <img src={product.image} alt={product.title} width="100%" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph>{product.description}</Typography>
          <Typography variant="h6" paragraph>Price: ${product.price}</Typography>
          <Typography variant="body2" paragraph>Category: {product.category}</Typography>
          <Button variant="contained" color="primary">Add to Cart</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
