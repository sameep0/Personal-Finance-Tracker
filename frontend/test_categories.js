const axios = require('axios');

async function testCategories() {
  const baseURL = 'http://localhost:3001';
  
  try {
    
    console.log('Logging in...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'new@gmail.com', 
      password: 'password123'  
    });
    
    const token = loginResponse.data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    console.log('Token received:', token.substring(0, 20) + '...');
    
    
    console.log('\nChecking current categories...');
    const categoriesResponse = await axios.get(`${baseURL}/user/categories`, config);
    console.log('Current categories:', categoriesResponse.data.map(c => `${c.name} (${c.type})`));
    
 
    console.log('\nCreating "Tutioning Students" category...');
    const createResponse = await axios.post(`${baseURL}/debug/create-category`, {
      name: 'Tutioning Students',
      type: 'income',
      color: '#4caf50',
      description: 'Income from tutoring students'
    }, config);
    
    console.log('Create response:', createResponse.data);
    
    
    console.log('\nChecking categories after creation...');
    const updatedCategoriesResponse = await axios.get(`${baseURL}/user/categories`, config);
    console.log('Updated categories:', updatedCategoriesResponse.data.map(c => `${c.name} (${c.type})`));
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testCategories(); 