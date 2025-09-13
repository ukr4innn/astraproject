# Script PowerShell para executar o site Astra no Docker

Write-Host "🚀 Iniciando Astra Website no Docker..." -ForegroundColor Green

# Verificar se o Docker está instalado
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker não está instalado!" -ForegroundColor Red
    Write-Host "📥 Instale o Docker: https://docs.docker.com/get-docker/" -ForegroundColor Yellow
    exit 1
}

# Verificar se o Docker Compose está instalado
try {
    docker-compose --version | Out-Null
} catch {
    Write-Host "❌ Docker Compose não está instalado!" -ForegroundColor Red
    Write-Host "📥 Instale o Docker Compose: https://docs.docker.com/compose/install/" -ForegroundColor Yellow
    exit 1
}

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Construir e iniciar o container
Write-Host "🔨 Construindo e iniciando o site..." -ForegroundColor Yellow
docker-compose up --build -d

# Verificar status
Write-Host "📊 Verificando status do container..." -ForegroundColor Green
docker-compose ps

# Mostrar logs
Write-Host "📋 Logs do site (Ctrl+C para sair):" -ForegroundColor Green
Write-Host "🌐 Site disponível em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🌐 Site público: https://astraproject.shop (após configurar DNS)" -ForegroundColor Cyan
docker-compose logs -f website
