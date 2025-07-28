from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get('/health')
def health():
    return {'status': 'ok', 'deepseek_key': 'sk-dc146c694369404a...'}

@app.get('/')
def root():
    return {'message': 'DeepNeed Simple API is running'}

import uvicorn
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
