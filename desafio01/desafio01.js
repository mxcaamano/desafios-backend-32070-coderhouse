class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(Nmascota){        
        this.mascotas.push(Nmascota);
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre,autor){
        this.libros.push({
                nombre: nombre,
                autor: autor
            })
    }
    getBookNames(){
            let nombres = this.libros.map(function (elem){
            return elem.nombre;
        });
        console.log(nombres);
    }
}

const martin = new Usuario("Martin","Caamaño",{nombre: "Hablemos de Guita", autor: "R. Marra"},"Perro");
console.log(martin.getFullName());
martin.addMascota("Gato");
console.log(martin.mascotas);
console.log(martin.countMascotas());
martin.addBook("La ética de la libertad", "M. N. Rothbard");
martin.getBookNames();