import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ service: "api_v2", time: new Date().toISOString() }));
app.get("/amit", (req, res) => res.json({
           message: 'The server is running',
           createdby: 'meAmit',
           createdOn: '02-Nov-2025',
           reason: 'farmershop pipeline was failing' ,
           server_bot: 'nice things takes time'
       })
    
)
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
