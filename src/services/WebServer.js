import polka from 'polka';
import userAuth from './OAuth';

const app = polka();

app.get(`/${process.env.GOOGLE_CALLBACK_URL}`, async (req, res) => {
    const code = req.query.code;
    if(!code) res.error();
    userAuth.setCredentials(await userAuth.getToken(code));
    res.end('OK');
});
console.log(process.env.PORT_URL);
app.listen(process.env.PORT_URL);