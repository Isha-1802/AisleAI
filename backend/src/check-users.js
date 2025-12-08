const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI)
    .then(async (conn) => {
        console.log('Connected to DB:', conn.connection.name);

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => console.log(`- ${u.name} (${u.email})`));

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
