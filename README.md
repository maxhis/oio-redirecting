Simple URL redirect service. Redis is required for statistics.

## Run

```
npm start
```

## Run with Docker

```
docker run \
  -e "REDIS_URL=your_redis_url" \
  -p 4000:4000 -d maxhis/oio-redirecting
```