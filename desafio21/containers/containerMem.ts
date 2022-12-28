export class ContainerMem {

    constructor(){
        this.element = [];
    }

    save = async (obj) =>{
        try {
            const myUUID = crypto.randomUUID();
            const Obj = {...obj,id:myUUID};
            await this.element.push(Obj);
            return Obj;
        } catch (error) {
            return {msg: error}
        }
    }

    getById = async (id) =>{
        try {
            const obj = await this.element.find(el => el.id === id);
            if(obj === undefined){
                return [];
            }else{
                return obj;
            }
        } catch (error) {
            return {msg: error}
        }
    }


    getAll = async () =>{
        try {
            return await [...this.element];
        } catch (error) {
            return {msg: error}
        }
    }

    deleteById = async (id) =>{
        try {
            const data = await this.element.filter(el => el.id !== id);
            this.element = [...data];
            return { delete:1 }
        } catch (error) {
            return {msg: error}
        }
    }

    deleteAll = async () => {
        try {
             this.element = await [];
        } catch (error) {
            return {msg: error}
        }
    }
}
