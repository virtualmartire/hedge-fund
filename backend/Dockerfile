# Backend Dockerfile for Flask API
FROM python:3.10-slim

WORKDIR /app

COPY server.py ./

RUN pip install --no-cache-dir flask flask-cors

EXPOSE 5000

CMD ["python", "server.py"]
