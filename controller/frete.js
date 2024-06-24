require('dotenv').config();
const produtoRepository = require('../repository/produto');



const post = (async (req, res) =>{
    const dadosFrete = req.body; 

    function getByIdAsPromise(id) {
        return new Promise((resolve, reject) => {
            produtoRepository.getById(id, (data, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async function calcularPeso(dadosFrete) {
        let pesoEmKg = 0.0;

        const promises = dadosFrete.map(async p => {
            try {
                const data = await getByIdAsPromise(p.id);
                pesoEmKg += (parseFloat(data[0].peso) * parseInt(p.qtd)) / 1000;
            } catch (err) {
                console.error(`Erro ao buscar produto com id ${p.id}:`, err);
            }
        });
    
        await Promise.all(promises);    
        return pesoEmKg;
    }

    (async () => {
        const pesoTotal = await calcularPeso(dadosFrete);
        
        fetch(`${process.env.ULR_MELHORENVIO}`, {
            method: 'POST',
            body: JSON.stringify({
                "from": {
                    "postal_code": "13487230"
                },
                "to": {
                    "postal_code": dadosFrete[0].cep
                },
                "package": {
                    "height": 4,
                    "width": 12,
                    "length": 17,
                    "weight": pesoTotal
                },
                "options": {
                    "receipt": false,
                    "own_hand": false
                },
                "services": "1,2"
            }),
            headers:{
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TOKEN_MELHORENVIO}`,
                "Content-Type":"application/json",
                "User-Agent": "Aplicação johrossato@gmail.com"
            }
        })
        .then(res => res.json())
        .then((data, err ) => {
            if (data.hasOwnProperty("errors")) {
                console.log(data)
                return res.status(500).json(data);
            }
            else{
                const response = [];
                data.map((object) => {
                    response.push({
                        "serviço": object.name,
                        "valor": object.price,
                        "prazo": object.delivery_time
                    });
                });
                return res.status(200).json(response);
            }            
        });
    })();
});

module.exports = {
    post
}