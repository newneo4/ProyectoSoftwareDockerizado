from app import create_app

app = create_app()

@app.route("/")
def home():
    return "Servidor Flask funcionando correctamente"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
