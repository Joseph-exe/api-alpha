import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';//usamos cheerio para recoger la informacion desordenada
import cors from "cors";
const app = express();
const corsOptions = {
    origin: 'https://test-s5f1.onrender.com/'
}

app.get("/",cors(corsOptions),async (req, res) => {
    try {
        const { data } = await axios.get("https://www.bcentral.cl/inicio");//llamamos a la banca central mediante una data

        const $ = cheerio.load(data);//con el signo $ se puede acceder a distintos elementos de una pagina web
        const selectorDolar = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

        const selectorUF = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";
        
        const objetoValores = {
            fecha: new Date().toLocaleDateString(),
            UF: $(selectorUF).text() ?? "sin datos",//si existe hagalo, si no tire error
            dolar: $(selectorDolar).text().split("/")[0].trim() ?? "sin datos",
            //text,trae todo el texto,split para el separador,[0] para traer el primer elemento y el trim
            //para quitar todos los espacios
        }
        res.json( objetoValores );
        
    } catch (error) {
        res.json((error))
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("server ON puerto "+ PORT));//aca dice que el puerto 500 esta activo