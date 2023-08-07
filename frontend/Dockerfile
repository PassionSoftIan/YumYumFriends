FROM nginx:alpine

COPY --from=build ./build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]