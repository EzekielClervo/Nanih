const fetch = require('node-fetch');

async function convertToCookie(req, res) {
    try {
        const { username, password } = req.body;
        const cookie = await getCookie(username, password);
        res.json(cookie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCookie(username, password) {
    const headers = {
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };

    const loginResponse = await fetch('https://free.facebook.com/login/device-based/regular/login/?shbl=1&refsrc=deprecated', {
        method: 'POST',
        headers: headers,
        body: `email=${username}&pass=${password}&login=Log+In`
    });

    const cookies = await loginResponse.headers.raw()['set-cookie'];
    const cookie = cookies.map(c => c.split(';')[0]).join(';');

    if (cookie.includes('c_user')) {
        return { success: true, cookie };
    } else {
        return { success: false, error: 'Invalid credentials or checkpoint' };
    }
}

module.exports = convertToCookie;
