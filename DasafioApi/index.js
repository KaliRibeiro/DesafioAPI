
import express from "express"; 
import knex from "knex";


const lollafest = knex({
    client:"mysql2",
    connection:{
        host:"127.0.0.1",
        port:3306,
        user:"root",
        password:"senacrs",
        database:"lollafest",
    },
})

const app = express()
const port = 3000

app.use(express.json())

app.get('/artista/:id', async(req, res) => {
  const {id} = req.params;
   const artista = await lollafest("artista").select("nome").where({id}); 
   res.send(artista);
  
});

app.post('/artista',async(req,res)=> {
    const {nome} = req.body;
    
    const artista = await lollafest('artista').insert({nome});
    
    res.json(artista);

});

app.delete("/artista/:id",async(req,res)=>{
    
    const{id} = req.params;

    const artista = await lollafest('artista').where({id}).del();

    res.json(artista)


})


app.get('/palco/:id', async (req, res) => {

    const{id} = req.params;

    const palco = await lollafest("artista").select("*").where({id});

    res.json(palco);

});


app.post('/palco', async(req,res)=>{
    const {nome, id_artista} = req.body;

    const palco = await lollafest('palco').insert({nome, id_artista});

    res.json(palco);

});


app.get('/show/:id', async (req,res)=>{

    const{id} = req.params;

    const show = await lollafest("apresentacao").select("*").where({id});

    res.json(show);

})

app.post('/show', async (req,res) => {

    const {data_horario, id_artista, id_palco} = req.body;

    const show = await lollafest("apresentacao").insert({data_horario, id_artista, id_palco});
    
    res.json(show);
    
})


app.get('/ingresso/:id', async(req,res)=>{

    const {id} = req.params;

    const ingresso = await lollafest("ingresso").select("*").where({id});

    res.json(ingresso);

})

app.post('/ingresso',async(req,res)=>{
    
    const{apresentacao_id} = req.body;


    const ingresso = await lollafest("ingresso").insert({apresentacao_id});

    res.json(ingresso);
})




app.get("/lineup", async (req, res) => {
    
const lineup = await lollafest('apresentacao').select("artista.nome", "palco.nome as Palco", "apresentacao.data_horario as Data " ).

join ('artista', "artista.id", "=", "apresentacao.id_palco").

join ('palco', 'palco.id', '=', "apresentacao.id_palco");

res.json(lineup);

    
});



app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})




