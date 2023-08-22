import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginForm = () => {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let apiUrl = '';
      let navigateUrl = '';

      switch (userType) {
        case 'inventoryManager':
          apiUrl = 'https://adminpr.onrender.com/api/invman/';
          // old navigate url 
          // navigateUrl = 'https://inv-manags.onrender.com/';
          // new url for IM
          navigateUrl = 'https://ecom-inventory-manager.onrender.com/';
          break;
        case 'deliveryAgent':
          apiUrl = 'https://adminpr.onrender.com/api/delivpar/';
           // old navigate url 
          // navigateUrl = 'https://deliv-partn.onrender.com';
          // new url for DA
          navigateUrl = 'https://cus-delivery-agent.onrender.com/';
          break;
        default:
          return;
      }

      const response = await axios.get(apiUrl);
      const userData = response.data;
      const foundUser = userData[0];

      if (foundUser.email === email && password === 'test1234') {
        // Navigate to the appropriate URL
        window.location.href = navigateUrl;
      } else {
        // Credentials are invalid
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log('An error occurred during API call');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className='head'><h2>LOGIN</h2></div>
      <label className='option'>
        User Type : {userType}
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select User Type</option>
          <option value="inventoryManager">Inventory Manager</option>
          <option value="deliveryAgent">Delivery Agent</option>
        </select>
      </label>

      {(userType === 'inventoryManager' || userType === 'deliveryAgent') && (
        <div className='credentials'>
          <label>
            Email:
            <input className='input-handle' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input className='input-handle' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
      )}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
