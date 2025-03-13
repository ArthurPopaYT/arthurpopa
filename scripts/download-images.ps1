# Creează directoarele necesare
New-Item -ItemType Directory -Force -Path "public/images/youtube"

# Array cu URL-urile imaginilor
$images = @{
    "youtube-logo.png" = "https://raw.githubusercontent.com/arthurpopa/assets/main/youtube-logo.png"
    "youtube-banner.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/youtube-banner.jpg"
    "profile-avatar.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/profile-avatar.jpg"
    "junimea.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/junimea.jpg"
    "rubik-comparison.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rubik-comparison.jpg"
    "cesky-krumlov.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/cesky-krumlov.jpg"
    "moise-nicoara.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/moise-nicoara.jpg"
    "arad-drone.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/arad-drone.jpg"
    "rubik-tutorial.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rubik-tutorial.jpg"
    "rubik-collection.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rubik-collection.jpg"
    "rubik-beginners.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rubik-beginners.jpg"
    "rc-revolt.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rc-revolt.jpg"
    "rc-monster.jpg" = "https://raw.githubusercontent.com/arthurpopa/assets/main/rc-monster.jpg"
}

# Descarcă fiecare imagine
foreach ($image in $images.GetEnumerator()) {
    $outFile = "public/images/youtube/$($image.Key)"
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outFile
}

Write-Host "Done downloading images!" 