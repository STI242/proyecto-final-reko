from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter

app = Flask(__name__)
CORS(app)

def cargar_datasets():
    try:
        dataNetflix = pd.read_csv("datasets/dataNetflix.csv")
        dataPrime = pd.read_csv("datasets/dataPrime.csv")
        dataHbo = pd.read_csv("datasets/dataHbo.csv")
        return dataNetflix, dataPrime, dataHbo
    except Exception as e:
        print(f"Error al cargar los datasets: {e}")
        return None, None, None

def generar_usuario_ficticio(respuestas):
    try:
        print("Respuestas recibidas:", respuestas)

        # Validate for empty responses
        if not respuestas:
            raise ValueError("No se recibieron respuestas válidas.")

        # Obtain the most frequent platform
        plataformas = [plataforma for r in respuestas for plataforma in r["plataformas"]]
        if not plataformas:
            raise ValueError("No se seleccionaron plataformas.")
        
        plataforma_moda = Counter(plataformas).most_common(1)[0][0]
        
        # Obtain the most frequent genres
        generos = list(set.union(*[set(r["generos"]) for r in respuestas if r["generos"]]))
        if not generos:
            raise ValueError("No se proporcionaron géneros válidos.")
        
        # Obtain the most frequent format
        formatos = [r["formato"] for r in respuestas if r["formato"]]
        
        if len(respuestas) % 2 == 0:
            todos_eligieron_ambos = all("movie" in f and "tv" in f for f in formatos)
            if todos_eligieron_ambos:
                formato = ["movie", "tv"]
            else:
                formatos_flat = [fmt for f in formatos for fmt in f]
                formato = [Counter(formatos_flat).most_common(1)[0][0]]
        else:
            formatos_flat = [fmt for f in formatos for fmt in f]
            formato = [Counter(formatos_flat).most_common(1)[0][0]]

        # Calculate the average minimum rating
        calificaciones = [r["calificacion_minima"] for r in respuestas if isinstance(r["calificacion_minima"], (int, float))]
        if not calificaciones:
            raise ValueError("No se proporcionaron calificaciones mínimas válidas.")
        
        calificacion_minima = sum(calificaciones) / len(calificaciones)

        # Calculate the average ages rating
        anios_desde = [int(r["rango_anios"]["desde"]) for r in respuestas if r["rango_anios"]["desde"]]
        anios_hasta = [int(r["rango_anios"]["hasta"]) for r in respuestas if r["rango_anios"]["hasta"]]
        if not anios_desde or not anios_hasta:
            raise ValueError("No se proporcionaron años válidos.")
        
        rango_anios = (min(anios_desde), max(anios_hasta))

        print("Usuario ficticio generado:", {
            "plataforma_moda": plataforma_moda,
            "generos": generos,
            "formato": formato,
            "calificacion_minima": calificacion_minima,
            "rango_anios": rango_anios
        })

        return {
            "plataforma_moda": plataforma_moda,
            "generos": generos,
            "formato": formato,
            "calificacion_minima": calificacion_minima,
            "rango_anios": rango_anios
        }
    except Exception as e:
        print(f"Error al generar el usuario ficticio: {e}")
        return {"error": str(e)}

# Function to load the data from the CSV file based on the platform mode
def cargar_dataset_por_plataforma(plataforma):
    try:
        if plataforma == "Netflix":
            dataset = pd.read_csv("datasets/dataNetflix.csv")
            dataset['platform'] = "Netflix"
        elif plataforma == "Prime":
            dataset = pd.read_csv("datasets/dataPrime.csv")
            dataset['platform'] = "Prime"
        elif plataforma == "HBO":
            dataset = pd.read_csv("datasets/dataHbo.csv")
            dataset['platform'] = "HBO"
        else:
            raise ValueError("Plataforma no soportada")
        return dataset
    except Exception as e:
        print(f"Error al cargar el dataset para {plataforma}: {e}")
        return None

# Function for preparing dataset for vectorization
def preparar_datos_para_vectorizacion(dataset):
    dataset['genres'] = dataset['genres'].fillna('')
    dataset['type'] = dataset['type'].fillna('')
    dataset['releaseYear'] = dataset['releaseYear'].fillna(0).astype(int)

    # Crear columna combinada
    dataset['combined_features'] = (
        dataset['genres'] + ' ' +
        dataset['type'] + ' ' +
        dataset['releaseYear'].astype(str)
    )
    return dataset

# Function for generating recommendations using cosine similarity
def recomendar_con_coseno_y_knn(dataset, usuario_ficticio, k=10):
    dataset = preparar_datos_para_vectorizacion(dataset)

    # Filter dataser for fictional user preferences
    dataset_filtrado = dataset[ 
        (dataset['type'].isin(usuario_ficticio['formato'])) & 
        (dataset['imdbAverageRating'] >= usuario_ficticio['calificacion_minima']) &
        (dataset['releaseYear'] >= usuario_ficticio['rango_anios'][0]) &
        (dataset['releaseYear'] <= usuario_ficticio['rango_anios'][1])
    ]

    if dataset_filtrado.empty:
        return []

    # Vectorize the combined features
    vectorizer = CountVectorizer()
    vectors = vectorizer.fit_transform(dataset_filtrado['combined_features']).toarray()

    # Create user vector
    print("Generos:", usuario_ficticio['generos'])
    print("Formato:", usuario_ficticio['formato'])
    print("Rango años:", usuario_ficticio['rango_anios'])

    user_preferences = (
      ' '.join(usuario_ficticio['generos']) + ' ' +
      ' '.join(usuario_ficticio['formato']) + ' ' + 
      ' '.join([str(año) for año in range(int(usuario_ficticio['rango_anios'][0]), int(usuario_ficticio['rango_anios'][1]) + 1)])
    )

    user_vector = vectorizer.transform([user_preferences]).toarray()

    # Calculate cosine similarities
    cosine_similarities = cosine_similarity(user_vector, vectors)
    similar_indices = cosine_similarities[0].argsort()[-k:][::-1]

    recomendaciones = dataset_filtrado.iloc[similar_indices]
    recomendaciones['similarity_score'] = cosine_similarities[0][similar_indices]
    recomendaciones = recomendaciones.sort_values('similarity_score', ascending=False)

    resultados = recomendaciones[['title', 'releaseYear', 'imdbAverageRating', 'genres', 'platform', 'type', 'similarity_score']].to_dict(orient='records')

    print("Recomendaciones generadas:")
    for rec in resultados:
        print(rec)

    return resultados

#LIST WHERE WE WILL STORE THE RECOMMENDATIONS
historico_recomendaciones = []

# Endppoint where we receive the responses from Client
@app.route('/recomendar', methods=['POST'])
def recomendar():
    try:
        data = request.json
        print("Data recibida:", data)
        respuestas = data['respuestas']
        group_name = data['group_name']

        usuario_ficticio = generar_usuario_ficticio(respuestas)
        dataset_seleccionado = cargar_dataset_por_plataforma(usuario_ficticio["plataforma_moda"])

        if dataset_seleccionado is not None:
            recomendaciones = recomendar_con_coseno_y_knn(dataset_seleccionado, usuario_ficticio, k=5)
            
            historico_recomendaciones.append({
                'group_name': group_name,
                'recomendaciones': recomendaciones
            })

            return jsonify({'recomendaciones': recomendaciones})

        return jsonify({'recomendaciones': []})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#Endpoit to get the historical recommendations
@app.route('/historial', methods=['GET'])
def obtener_historico_recomendaciones():
    return jsonify({'historico_recomendaciones': historico_recomendaciones})

if __name__ == '__main__':
    app.run(debug=True)