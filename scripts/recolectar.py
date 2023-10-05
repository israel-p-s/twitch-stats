CLIENT_ID='pyjdt0tbczzduhwpf5x2mjbebsawo6'
CLIENT_SECRET='1bhwo6eubq9yf35g2bx2i8r3fy2i04'

MONGO_URI='mongodb+srv://israelps:F4NW7TgEiTEG0W4w@cluster0.fszevls.mongodb.net/?retryWrites=true&w=majority'

import requests
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

def get_oauth_token():
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'client_credentials'
    }
    
    try:
        request = requests.post('https://id.twitch.tv/oauth2/token', data=data)
        request.raise_for_status()
    except requests.exceptions.RequestException as err:
        print("Error obteniendo token OAUTH:", err)
        return None

    return request.json().get('access_token', None)

def get_streams(pagination_cursor=None):
    oauth_token = get_oauth_token()
    
    if not oauth_token:
        print("No se pudo obtener el token OAUTH.")
        return None, None

    url = 'https://api.twitch.tv/helix/streams'
    headers = {
        'Authorization': f'Bearer {oauth_token}',
        'Client-Id': CLIENT_ID
    }
    
    params = {'first': 100} 
    if pagination_cursor:
        params['after'] = pagination_cursor

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as err:
        print("Error obteniendo los streams:", err)
        return None, None
       
    json_response = response.json()
    return json_response.get('data', None), json_response.get('pagination', {}).get('cursor', None)

def connect_to_mongo():
    try:
        client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print("Error conectando a MongoDB:", e)
        return None
    return client

def save_streams_to_db():
    pagination_cursor = None

    while True:
        streams, pagination_cursor = get_streams(pagination_cursor)
    
        if streams is None:
            print("No se obtuvieron datos de los streams.")
            return

        if not streams or streams[-1]['viewer_count'] < 1000:
            print("Streamers detectados con menos de 1000 viewers.")
            break

        for stream in streams:
            stream['timestamp'] = datetime.utcnow()

        mongo_client = connect_to_mongo()
    
        if mongo_client is None:
            print("No se pudo conectar a MongoDB.")
            return

        db = mongo_client["streams"] 
        collection = db["streams"]
        try:
            result = collection.insert_many(streams)
            print(f"Streams guardados con IDs: {result.inserted_ids}")
        except Exception as e:
            print("Error guardando en MongoDB:", e)

if __name__ == "__main__":
    save_streams_to_db()