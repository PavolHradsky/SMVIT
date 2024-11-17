from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory='static'), name='static')

templates = Jinja2Templates(directory='templates')

app.temperature = [0]

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(
        request, "index.html"
    )


@app.get('/temperature')
async def get_temperature():
    return JSONResponse({"temperature": app.temperature})


@app.post('/temperature')
async def post_temperature(request: Request):
    json = await request.json()
    app.temperature.insert(0, json["temperature"])
    if len(app.temperature) > 50:
        app.temperature = app.temperature[0:50]
    return JSONResponse({"status": "ok"})