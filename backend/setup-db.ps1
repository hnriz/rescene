# Script para criar banco de dados Rescene
# Localize o mysql.exe no seu computador e atualize o caminho abaixo

$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$sqlFile = "docs\rescenedb.sql"
$dbUser = "root"
$dbPassword = ""

# Verificar se mysql existe
if (-not (Test-Path $mysqlPath)) {
    Write-Host "❌ MySQL não encontrado em: $mysqlPath" -ForegroundColor Red
    Write-Host "Por favor, instale MySQL ou atualize o caminho no script" -ForegroundColor Yellow
    exit 1
}

# Verificar se arquivo SQL existe
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Arquivo SQL não encontrado: $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host "Criando banco de dados Rescene..." -ForegroundColor Green

# Se tem senha, adicione -p$dbPassword
if ($dbPassword) {
    & $mysqlPath -u $dbUser -p$dbPassword < $sqlFile
} else {
    & $mysqlPath -u $dbUser < $sqlFile
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Banco de dados criado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao criar banco de dados" -ForegroundColor Red
}
