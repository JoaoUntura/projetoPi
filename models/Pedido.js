import db from "../config/database.js";
import csv from 'csv-parser';
import fs from 'fs';

 class Pedido{

    async findAll(){
        try {
            const pedidos = await db.select("id","data","cliente_id", "total", "forma_pagamento").table("Pedido")
            return {validated: true, values:pedidos}
        } catch (error) {
            return {validated: false, error: error}
        }
           }


    async findById(id){
        try{

            const pedido = await db.select("id","data","cliente_id", "total", "forma_pagamento").where("id", id).table("Pedido")
            return pedido.length > 0 
            ?{validated:true, values:pedido}
            :{validated:true, values:undefined}

        }catch(error){
            return {validated: false, error: error}
        }
    }

    async create(data, cliente_id, total,forma_pagamento){
        try{
            await db.insert({data:data, cliente_id:cliente_id, total:total,forma_pagamento:forma_pagamento }).table("Pedido")
            return {validated:true}
        }catch(error){
            return {validated: false, error: error}
        }
    }

    
    async update(id, data, cliente_id, total, forma_pagamento){

        let pedido = await this.findById(id)

        if(pedido.validated && pedido.values != undefined){
           
            let editPedido = {}
            data ? editPedido.data = data : null
            cliente_id ? editPedido.cliente_id = cliente_id : null
            total ? editPedido.total = total : null
            forma_pagamento ? editPedido.forma_pagamento = forma_pagamento : null

            try{
                await db.update(editPedido).where('id', id).table("Pedido")
                return {validated:true}
            }catch(error){
                return {validated: false, error: error}
            }

        }else{
            return {validated:false, error: "Pedido não existente"}
        }

    }

    async insertViaCsv(file){
   
        const results = [];
        try{

        fs.createReadStream(file)
          .pipe(csv())
          .on('data', (data) => {
            const formatDate = (dateStr) => {
                const [day, month, year] = dateStr.split("/");
                return `${year}-${month}-${day}`;
              };
            const newData = {
                data: formatDate(data.data),
                cliente_id: parseInt(data.cliente_id),
                total: parseFloat(data.total),
                forma_pagamento: data?.forma_pagamento || "Não Informado"
            };
            console.log(newData)
            results.push(newData); // cada `data` é um objeto com as colunas do CSV
          })
          .on('end', async () => {
        
              
              await db('Pedido').insert(results);
      
              
              fs.unlinkSync(file);
      
            
          });
          
          return {validated: true, values: results}
        }catch (err) {
            return {validated: false, err: err.message}
        }
    }


}

export default new Pedido()