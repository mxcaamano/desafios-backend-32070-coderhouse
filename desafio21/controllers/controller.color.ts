import { Context } from "../deps.ts";
import { ContainerMem } from "../containers/containerMem.ts";

const contenedorColor = new ContainerMem()

const getMain = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const colors = await contenedorColor.getAll();
        await ctx.render("index.ejs", {data:colors} );
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}


const saveColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const body = await ctx.request.body().value;
        const color = body.get('color')
        await contenedorColor.save({id:'',color:color});
        ctx.response.redirect("/");
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

const getColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const data =  await contenedorColor.getAll();
        ctx.response.body = data;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

const getColorById = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const id = ctx.params.id;
        const data =  await contenedorColor.getById(id);

        ctx.response.body = data;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

const deleteColorById = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const id = ctx.params.id;
        const data =  await contenedorColor.deleteById(id);
        ctx.response.body = data;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

const deleteAllColors = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const data =  await contenedorColor.deleteAll();
        ctx.response.body = data;
        ctx.response.redirect("/");
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export { getMain, getColor, saveColor, getColorById, deleteColorById, deleteAllColors}