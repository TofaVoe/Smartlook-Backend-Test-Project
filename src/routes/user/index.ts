import {config} from "../../types/IConfig";
import {IUserLogin, IUserRegister} from "../../types/entities/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Koa, {Next} from "koa";
import {IJwtToken} from "../../types/IJwtToken";

// https://github.com/koajs/koa/issues/1516
async function register(ctx: any){ // Koa.Context -- resolve how to type context.body
  const user = <IUserRegister>ctx.request.body;
  // const {name, email, password} = user; This probably don't work due the issue with Koa.Context I have
  const name: string = user.name;
  const email: string = user.email;
  const password: string = user.password;

  if (!(name && email && password)){
    ctx.throw(400, config.responseMsg.badpayload);
  }

  const hashed_password = await bcrypt.hash(password, config.security.salt);

  const query = "INSERT INTO \"user\" (name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, hashed_password];

  try {
    const res = await ctx.db.query(query, values);

    if (res.rows.length){
      ctx.status = 201;
      ctx.body = {
        status: config.responseMsg.statusCreated
      }
    } else {
      console.log(res);
      ctx.status = 400;
      ctx.body = {
        status: config.responseMsg.databaseError
      }
    }
    // TODO: what type? Getting Typescript error with ErrnoException
  } catch (e: any) {
    if (e.code == 23505) {
      ctx.throw(400, config.responseMsg.duplicity)
    } else {
      ctx.throw(500, e.name);
    }
  }
}

async function login(ctx: any) {
  const login_credentials = <IUserLogin>ctx.request.body;

  const email = login_credentials.email;
  const password = login_credentials.password;

  if (!(email && password)) {
    ctx.throw(400, config.responseMsg.badpayload);
  }

  const query = "SELECT id, name, email, password FROM \"user\" WHERE email = $1";
  const values = [email];

  try {
    const res = await ctx.db.query(query, values);

    if (res.rows.length) {
      const data = res.rows[0];
      const hashed_password = data.password;

      const passwordMatch: boolean = await bcrypt.compare(password, hashed_password);
      if (passwordMatch) {
        const token = jwt.sign(
          { id: data.id},
          config.jwt.secret,
          {
            expiresIn: config.jwt.expires
          });

        ctx.status = 200;
        ctx.body = {
          token: token
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          status: config.responseMsg.failedToLogin
        }
      }
    } else {
      ctx.status = 402;
      ctx.body = {
        status: config.responseMsg.failedToLogin
      }
    }
  } catch (e: any) {
    console.log(e)
    ctx.throw(500, e.name);
  }
}

// Middleware
async function verify(ctx: Koa.Context, next: Next) {
  if (ctx.headers && ctx.headers.authorization){
    try {
      const token = ctx.headers.authorization;
      const decodedToken = <IJwtToken>jwt.verify(token, config.jwt.secret);
      ctx.app.context.userid = decodedToken.id;
      ctx.status = 200;
    } catch (e) {
      ctx.throw(401, config.responseMsg.unauthorized);
      console.log(e)
    }
  } else {
    ctx.throw(401, config.responseMsg.unauthorized);
  }
  await next();
}

async function about(ctx: Koa.Context) {
  const query = "SELECT * FROM \"user\" WHERE id = $1";
  const values = [ctx.userid ?? null]
  const user = await ctx.db.query(query, values);
  console.log(user)
  ctx.status = 200;
  ctx.body = user;
}

export default {register, login, verify, about};
