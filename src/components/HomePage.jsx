import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardMedia, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch all products
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);  // Initially, all products are displayed
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    
    // Filter products by selected category
    if (selectedCategory === '') {
      setFilteredProducts(products); // If no category is selected, show all products
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>

      {/* Category Filter Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Filter by Category"
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
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
