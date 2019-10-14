import polka from 'polka';
import userAuth from './OAuth';
import {writeFileSync} from 'fs';

const app = polka();


async function storeCrendentials(tokens) {
    writeFileSync('credentials.json', JSON.stringify(tokens), 'utf8');
}

app.get(`/${process.env.GOOGLE_CALLBACK_URL}`, async (req, res) => {
    const code = req.query.code;
    if(!code) res.error();
    const {tokens} = await userAuth.getToken(code);
    userAuth.setCredentials(tokens);
    storeCrendentials(tokens);
    res.end('OK');
});


console.log(process.env.PORT_URL);
app.listen(process.env.PORT_URL);