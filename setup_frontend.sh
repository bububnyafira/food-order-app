#!/bin/bash

# Membuat folder proyek frontend
mkdir -p frontend/src/{components,pages}

# Membuat file entry utama
cat <<EOF > frontend/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
EOF

# Membuat file App.js
cat <<EOF > frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

export default App;
EOF

# Membuat komponen halaman dasar
cat <<EOF > frontend/src/pages/Home.jsx
import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to FastFood Delight</h1>
        </div>
    );
};

export default Home;
EOF

cat <<EOF > frontend/src/pages/Menu.jsx
import React from 'react';

const Menu = () => {
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold text-blue-600">Our Menu</h1>
        </div>
    );
};

export default Menu;
EOF

cat <<EOF > frontend/src/pages/Cart.jsx
import React from 'react';

const Cart = () => {
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold text-blue-600">Your Cart</h1>
        </div>
    );
};

export default Cart;
EOF

# Install Tailwind CSS dependencies
npm create vite@latest frontend --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Update Tailwind CSS config
cat <<EOF > frontend/tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [],
}
EOF

# Create index.css
cat <<EOF > frontend/src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

echo "Frontend structure has been created!"
