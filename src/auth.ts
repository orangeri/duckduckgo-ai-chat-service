import { Hono } from "jsr:@hono/hono";  
import { bearerAuth } from "jsr:@hono/hono/bearer-auth";  
import { BlankEnv, BlankSchema } from "jsr:@hono/hono/types";  

function auth(app: Hono<BlankEnv, BlankSchema, "/">) {  
  const tokens: string[] = [];  
  
   
  for (const [key, value] of Object.entries(Deno.env.toObject())) {  
      
    if (key.startsWith("TOKEN")) {  
      tokens.push(value);  
    }  
  }  

  if (tokens.length > 0) {  
    app.use("/v1/*", bearerAuth({ token: tokens }));  
  }  
}  

export { auth };
