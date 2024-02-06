const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('discord.js');

const app = express();
const port = 3000;
const discordToken = 'MTIwNDQ0MzI2MzkxMDgxMzc5Ng.GtbApw.d5pGttHHPmVOIj_rMuooqgeFZev4jNr46IcyrASEU_TOKEN_DISCORD';
const channelId = '1204446331616235550';

const client = new Client();
client.login(discordToken);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/form-submit', (req, res) => {
    const { nome, identificador, data, url, descricao } = req.body;
    const message = `Nome: ${nome}\nID: ${identificador}\nData: ${data}\nURL: ${url}\nDescrição: ${descricao}`;
    const channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(message);
        res.send('Formulário enviado com sucesso!');
    } else {
        res.status(500).send('Erro ao enviar mensagem para o Discord.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



