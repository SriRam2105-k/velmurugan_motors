# Download Hero MotoCorp official bike images from their Scene7 CDN
# These are official product images served through Adobe Dynamic Media

$baseDir = "c:\Users\srira\OneDrive\Desktop\freelance\VELMURUGAN MOTORS\public\bikes"

# Mapping of bike slug -> Scene7 image ID
# Format: https://s7ap1.scene7.com/is/image/hmcl/{imageId}?fmt=png-alpha&wid=800
$bikes = @{
    "hf-deluxe"           = "hf-deluxe"
    "hf-deluxe-pro"       = "hf-deluxe"
    "splendor-plus"       = "splendor-plus-self-alloy"
    "splendor-plus-2o"    = "splendor-plus-self-alloy"
    "splendor-plus-xtec"  = "splendorplus-xtec-20"
    "passion-plus"        = "passion-pro"
    "super-splendor-125"  = "super-splendor"
    "glamour-xtec-125"    = "glamour-xtec"
    "xtreme-125"          = "xtreme-125r"
    "pleasure-plus-110"   = "pleasure-plus"
    "pleasure-xtec"       = "pleasure-plus-xtec"
    "xoom-110"            = "xoom-110"
    "destini-xtec-125"    = "destini-125-xtec"
}

foreach ($bike in $bikes.GetEnumerator()) {
    $slug = $bike.Key
    $imageId = $bike.Value
    $dir = Join-Path $baseDir $slug
    $filePath = Join-Path $dir "main.png"
    
    if (Test-Path $filePath) {
        Write-Host "SKIP: $slug (already exists)" -ForegroundColor Yellow
        continue
    }

    # Create directory
    New-Item -ItemType Directory -Path $dir -Force | Out-Null

    # Try PNG format with alpha channel, 800px wide
    $url = "https://s7ap1.scene7.com/is/image/hmcl/${imageId}?fmt=png-alpha&wid=800"
    
    Write-Host "Downloading: $slug from $url" -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction Stop
        $size = (Get-Item $filePath).Length
        if ($size -lt 1000) {
            Write-Host "  WARNING: File too small ($size bytes), may be invalid" -ForegroundColor Red
            Remove-Item $filePath
        } else {
            Write-Host "  OK: $([math]::Round($size/1024, 1)) KB" -ForegroundColor Green
        }
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
        # Try alternate URL format
        $altUrl = "https://s7ap1.scene7.com/is/image/hmcl/${imageId}?fmt=png&wid=800"
        Write-Host "  Trying alternate: $altUrl" -ForegroundColor Yellow
        try {
            Invoke-WebRequest -Uri $altUrl -OutFile $filePath -ErrorAction Stop
            $size = (Get-Item $filePath).Length
            if ($size -lt 1000) {
                Write-Host "  WARNING: Alternate file too small ($size bytes)" -ForegroundColor Red
                Remove-Item $filePath
            } else {
                Write-Host "  OK (alt): $([math]::Round($size/1024, 1)) KB" -ForegroundColor Green
            }
        } catch {
            Write-Host "  FAILED (alt): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "=== Download Summary ===" -ForegroundColor White
$downloaded = Get-ChildItem -Path $baseDir -Recurse -Filter "main.png" -ErrorAction SilentlyContinue
Write-Host "Total images: $($downloaded.Count) / $($bikes.Count)" -ForegroundColor White
foreach ($img in $downloaded) {
    $bikeSlug = $img.Directory.Name
    Write-Host "  $bikeSlug - $([math]::Round($img.Length/1024, 1)) KB" -ForegroundColor Green
}
