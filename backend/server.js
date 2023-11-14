const config = require('./config.json');
const express = require('express');
const CreateClient = require('@supabase/supabase-js').createClient;
const supabase = CreateClient(config.SB_URL, config.SB_KEY);

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});

app.get('/recent', async (req, res) => {
    const { data, error } = await supabase
        .from('bingo')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);
    if (error) {
        console.log({ error });
        return res.status(500).json({ error });
    } 
    return res.json({ data });
});

app.get('/options', async (req, res) => {
    const { data, error } = await supabase
        .from('options')
        .select('*');
    if (error) {
        console.log({ error });
        return res.status(500).json({ error });
    }
    return res.json(data);
});

app.post('/submit', async (req, res) => {
    const { username, bingoEncoding } = req.body;
    console.log(req.body, { username, bingoEncoding });
    if (!username || !bingoEncoding) {
        return res.status(400).json({ message: 'Missing username or bingoEncoding' });
    }
    console.log({ username, bingoEncoding });
    const { data, error } = await supabase
        .from('bingo')
        .insert([
            { username, choices: bingoEncoding }
        ]);
    if (error) {
        console.log({ error });
        return res.status(500).json({ error });
    }
    return res.json({ message: 'success' });
});
