# Astro sin adapter: el build es estático. Compilamos con Node y servimos
# el dist/ con nginx, así la imagen final no lleva Node ni node_modules.

# ---- build ----
FROM node:22-alpine AS build

WORKDIR /app

# Copiamos solo los manifiestos primero: la capa de dependencias se reaprovecha
# mientras package.json y el lock no cambien.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# `npm run build` = astro check && astro build. El check valida los datos de
# todos los clientes, así que un cliente con campos a medias rompe la imagen
# aquí y no en producción.
RUN npm run build

# ---- runtime ----
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
