const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI)
    .then(async (conn) => {
        console.log('Connected to DB:', conn.connection.name);

        const products = await Product.find({});
        console.log(`Found ${products.length} products in database`);

        if (products.length > 0) {
            console.log('\nSample products:');
            products.slice(0, 5).forEach(p => console.log(`- ${p.name} by ${p.brand} - ₹${p.price}`));
        } else {
            console.log('\n⚠️  No products found! Run: npm run seed');
        }

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
