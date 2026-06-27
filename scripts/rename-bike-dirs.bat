@echo off
cd /d "%~dp0\..\public\bikes"

ren "Destini XTEC 125" "destini-xtec-125"
ren "Glamour XTEC 125" "glamour-xtec-125"
ren "HF Deluxe" "hf-deluxe"
ren "Passion" "passion"
ren "Pleasure +XTEC" "pleasure-xtec"
ren "Splendor +" "splendor-plus"
ren "Splendor + XTEC" "splendor-plus-xtec"
ren "Splendor + XTEC 2.0" "splendor-plus-xtec-20"
ren "Xoom 110" "xoom-110"
ren "Xtreme 125R" "xtreme-125r"

echo Renaming files in each directory...

for /d %%D in (*) do (
    pushd "%%D"
    for %%F in (*.jpg *.png) do (
        setlocal enabledelayedexpansion
        set "oldname=%%~nF"
        set "newname=!oldname: =-!"
        if not "!oldname!"=="!newname!" (
            ren "%%F" "!newname!%%~xF"
        )
        endlocal
    )
    popd
)

echo Done!
