# Script para corregir el error de CSS
$cssFile = "C:\Proyectos\Web\blog-politico\blog-politico-lightbi\static\css\main.css"
$content = Get-Content $cssFile -Raw -Encoding UTF8

# Corregir el comentario mal formado
$correctedContent = $content -replace "/ \*\s+E\s+s\s+t\s+i\s+l\s+o\s+s.*?\*/\s*", ""

Set-Content $cssFile $correctedContent -Encoding UTF8 -NoNewline
Write-Host "Archivo CSS corregido exitosamente"
