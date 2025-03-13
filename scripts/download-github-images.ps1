# Creează directorul pentru imagini dacă nu există
$imageDir = "public/images/github"
if (!(Test-Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force
}

# Array cu URL-urile imaginilor și numele fișierelor
$images = @(
    @{
        url = "https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png"
        filename = "github-logo.png"
    },
    @{
        url = "https://avatars.githubusercontent.com/u/583231"
        filename = "profile-avatar.jpg"
    }
)

# Descarcă fiecare imagine
foreach ($image in $images) {
    $outputPath = Join-Path $imageDir $image.filename
    Write-Host "Downloading $($image.url) to $outputPath"
    try {
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath
        Write-Host "Successfully downloaded $($image.filename)"
    }
    catch {
        Write-Host "Failed to download $($image.filename): $_"
    }
}

Write-Host "Done downloading images!" 