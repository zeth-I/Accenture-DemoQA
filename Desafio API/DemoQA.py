import urllib.request
import urllib.error
import json

base_url = "https://demoqa.com"
user = {"userName": "teste_api_143", "password": "Teste@123"}

def post_request(url, data, token=None):
    """Função para fazer requisições POST"""
    data_bytes = json.dumps(data).encode('utf-8')
    headers = {'Content-Type': 'application/json'}
    
    if token:
        headers['Authorization'] = f'Bearer {token}'
    
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            return {'status': response.status, 'data': json.loads(response.read().decode('utf-8'))}
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'data': e.read().decode('utf-8'), 'error': True}

def get_request(url, token=None):
    """Função para fazer requisições GET"""
    headers = {}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    
    try:
        with urllib.request.urlopen(req) as response:
            # Tenta converter para JSON, se falhar retorna o texto
            try:
                return {'status': response.status, 'data': json.loads(response.read().decode('utf-8')), 'is_json': True}
            except json.JSONDecodeError:
                return {'status': response.status, 'data': response.read().decode('utf-8'), 'is_json': False}
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'data': e.read().decode('utf-8'), 'error': True, 'is_json': False}

print("🚀 INICIANDO DESAFIO API DemoQA Accenture")

# 1 - Criar usuário
print("\n 1. Criando usuário...")
result = post_request(f"{base_url}/Account/v1/User", user)

if result['status'] == 201:
    user_id = result['data']['userID']
    print(f"Usuário criado com sucesso!")
    print(f"UserID: {user_id}")
else:
    print(f"Erro ao criar usuário. Status: {result['status']}")
    print(f"Resposta: {result['data']}")
    exit()

# 2 - Gerar token
print("\n 2. Gerando token...")
result = post_request(f"{base_url}/Account/v1/GenerateToken", user)

if result['status'] == 200:
    token = result['data']['token']
    print(f"Token gerado com sucesso!")
    print(f"Token: {token[:50]}...")
else:
    print(f"❌ Erro ao gerar token. Status: {result['status']}")
    exit()

# 3 - Verificar autorização - TRATANDO O ERRO DE JSON por retornar um HTML
print("\n 3. Verificando autorização...")

# Tentativa 1: GET (pode retornar HTML)
print("   📡 Tentando GET...")
result = get_request(f"{base_url}/Account/v1/Authorized/{user['userName']}")

if result['is_json']:
    print(f"Autorizado? {result['data']}")
else:
    print(f"GET retornou HTML/Texto (comportamento esperado da API)")
    print(f"Resposta: {result['data'][:100]}...")
    
    # Tentativa 2: POST (mais confiável)
    print("\n   📡 Tentando POST como alternativa...")
    result2 = post_request(f"{base_url}/Account/v1/Authorized", user)
    
    if result2['status'] == 200 and result2.get('is_json', True):
        print(f"Autorizado? {result2['data']}")
    elif result2['status'] == 200:
        print(f"Usuário autorizado (status 200)")
    elif result2['status'] == 401:
        print(f"Usuário NÃO autorizado (status 401)")
    else:
        print(f"Verificação ignorada - continuando fluxo...")

# 4 - Listar livros
print("\n 4. Listando livros disponíveis...")
result = get_request(f"{base_url}/BookStore/v1/Books")

if result['status'] == 200 and result['is_json']:
    livros = result['data']['books']
    print(f"Total de livros encontrados: {len(livros)}")
    print(f"Livro 1: {livros[0]['title']} - ISBN: {livros[0]['isbn']}")
    print(f"Livro 2: {livros[1]['title']} - ISBN: {livros[1]['isbn']}")
    isbns = [livros[0]["isbn"], livros[1]["isbn"]]
else:
    print(f"❌ Erro ao listar livros. Status: {result['status']}")
    exit()

# 5 - Alugar dois livros
print("\n 5. Alugando livros...")
payload = {
    "userId": user_id,
    "collectionOfIsbns": [{"isbn": isbns[0]}, {"isbn": isbns[1]}]
}
result = post_request(f"{base_url}/BookStore/v1/Books", payload, token)

if result['status'] == 201:
    print(f"Livros alugados com sucesso!")
    if isinstance(result['data'], dict):
        print(f"📋 Livros alugados: {len(result['data'].get('books', []))}")
    else:
        print(f"Livros alugados com sucesso!")
else:
    print(f"Erro ao alugar livros. Status: {result['status']}")
    print(f"Resposta: {result['data']}")

# 6 - Detalhes do usuário
print("\n 6. Buscando detalhes do usuário...")
result = get_request(f"{base_url}/Account/v1/User/{user_id}", token)

if result['status'] == 200 and result['is_json']:
    user_details = result['data']
    print(f"Detalhes obtidos com sucesso!")
    print(f"Usuário: {user_details['username']}")
    print(f"ID: {user_details['userId']}")
    print(f"Livros reservados: {len(user_details['books'])}")
    for i, book in enumerate(user_details['books'], 1):
        print(f"   {i}. {book['title']} (ISBN: {book['isbn']})")
else:
    print(f"Erro ao obter detalhes. Status: {result['status']}")
    print(f"Resposta: {result['data'][:200] if isinstance(result['data'], str) else result['data']}")

print("Finalizando aplicação")