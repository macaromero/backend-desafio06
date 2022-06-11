const fs = require('fs');

// Clase Mensajes
class Mensajes {

    static encoding = 'utf-8';
    static ruta = './data/mensajes.json';

    constructor() {
        this.id = 0;
    };

    async save (mensaje) {
        const all = await this.getAll();
        let idAnterior = 0;

        all.map(m => {
            return idAnterior = m.id;
        });
    
        mensaje.id = idAnterior + 1;
        idAnterior ++;
        all.push(mensaje);

        try {               
            await fs.promises.writeFile(Mensajes.ruta, JSON.stringify(all, null, 2));
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getAll() {
        try {
            let msj = await fs.promises.readFile(Mensajes.ruta, Mensajes.encoding);
            if (msj != "") {
                return JSON.parse(msj);
            } else {
                return msj = []
            }
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };
};

module.exports = Mensajes;