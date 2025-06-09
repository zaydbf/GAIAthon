# Project Setup and Run Guide

This guide explains how to run the project using **Docker Compose** or **manual setup** (with `requirements.txt` and `npm install`).

---

##  Run with  the existing Docker Compose 

### 1. Build the Docker Images

```bash
docker-compose build
```
### 2. Start the Containers
```bash
docker-compose up
```
the frontend will be available at http://localhost:5173
the backend will run at http://localhost:8000

of course you can change the Dockerfiles and docker-compose.yml for your likings

---

##  Manual Setup (Without Docker)

### 1. Backend Setup
```bash
cd backend
```
```bash
pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
```
```bash
npm install
```
##  Running the App Manually
### Terminal 1 – Start Backend
```bash
cd backend
```
```bash
python manage.py runserver
```
### Terminal 2 – Start frontend
```bash
cd frotend
```
```bash
npm run dev
```


