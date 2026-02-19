const axios = require('axios');
async function getToken() {
    try {
        const res = await axios.post('http://localhost:5001/api/auth/login', {
            email: 'new@bjik.com',
            password: 'password'
        });
        console.log(res.data.token);
    } catch (err) {
        console.error(err.message);
    }
}
getToken();
