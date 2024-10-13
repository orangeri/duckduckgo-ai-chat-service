import { Hono } from "jsr:@hono/hono";  
import { bearerAuth } from "jsr:@hono/hono/bearer-auth";  
import { BlankEnv, BlankSchema } from "jsr:@hono/hono/types";  

function auth(app: Hono<BlankEnv, BlankSchema, "/">) {  
  const tokens: string[] = [];  
  
  // Mengambil semua environment variables  
  for (const [key, value] of Object.entries(Deno.env.toObject())) {  
    // Memeriksa jika key dimulai dengan "TOKEN"  
    if (key.startsWith("TOKEN")) {  
      tokens.push(value);  
    }  
  }  

  if (tokens.length > 0) {  
    app.use("/v1/*", bearerAuth({ token: tokens }));  
  }  
}  

export { auth };
