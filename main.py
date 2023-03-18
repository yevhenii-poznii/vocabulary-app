import uvicorn
from fastapi import FastAPI
from fastapi.routing import APIRouter

from api.handlers import user_router

app = FastAPI(title="vocabulary-app")

main_api_router = APIRouter(prefix="/api/v1")

main_api_router.include_router(user_router, prefix='/user', tags=["user"])
app.include_router(main_api_router)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
