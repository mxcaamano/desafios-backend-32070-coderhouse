import { Application, viewEngine, ejsEngine, oakAdapter, config } from "./deps.ts"
import { router } from "./routes/routes.ts";

const port:string = '8080';
const app = new Application();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);

app.use(router.routes());

console.log('Sevidor DENO escuchando al puerto ' + port)
await app.listen({ port:8080 });