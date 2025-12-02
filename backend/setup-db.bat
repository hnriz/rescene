@echo off
REM Script para configurar o banco de dados Rescene

echo ========================================
echo    CONFIGURACAO DO BANCO DE DADOS RESCENE
echo ========================================
echo.

REM Verificar se mysql está instalado
where mysql >nul 2>nul
if %errorlevel% neq 0 (
    echo ERRO: MySQL nao encontrado no PATH
    echo Por favor, instale MySQL ou adicione ao PATH
    pause
    exit /b 1
)

echo Criando banco de dados rescene...
echo Digite a senha do MySQL quando solicitado:
echo.

mysql -u root -p < docs\rescenedb.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCESSO! Banco de dados criado.
    echo ========================================
    echo.
    echo Proximas etapas:
    echo 1. Edite o arquivo .env com suas credenciais MySQL
    echo 2. Execute: node server.js
    echo.
) else (
    echo.
    echo ERRO ao criar banco de dados!
    echo Verifique as credenciais do MySQL
)

pause
