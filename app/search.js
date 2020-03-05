export const store = {
    search: async (pagina = 0) => {
        const response = await fetch(`https://news-platform-service.herokuapp.com/api/v1/noticia/search?size=20&page=${pagina}&tags=jogos`);

        const responseJson = await response.json();
        responseJson.forEach(async item => {
            item.key = item.id;
            const respFont = await fetch(`https://news-platform-service.herokuapp.com/api/v1/fonte/${item.fonteId}`);
            const respJsonFont = await respFont.json();
            item.fonte = respJsonFont.nome;
            item.logo = respJsonFont.logo;
        });

        return tratarDataSource(responseJson);
    }
}

function tratarDataSource(resp = []) {
    resp.forEach((v, i) => {
        var myRegexp = /<img src=['\"](.*?)['\"]/g;
        var match = myRegexp.exec(v.resumo.replace('\r\n', ''));
        if (match) {
            v.imageTemplate = match[1];
        }
    });

    return resp;
}