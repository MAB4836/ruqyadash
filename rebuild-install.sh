#!/bin/bash

# Quran Manzil App - Rebuild and Install Script
echo "🕌 Building Quran Manzil App..."

# Build web assets
echo "📦 Building web assets..."
npm run build

# Copy to Android
echo "📱 Copying to Android..."
npx cap copy android

# Build APK
echo "🔨 Building APK..."
cd android
./gradlew assembleDebug

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if device is connected
    echo "📲 Checking for connected device..."
    adb devices
    
    # Install APK
    echo "⚡ Installing APK..."
    adb install -r app/build/outputs/apk/debug/app-debug.apk
    
    if [ $? -eq 0 ]; then
        echo "🎉 Installation successful!"
        echo "📱 App installed on device. You can now launch 'QuranManzil' app."
    else
        echo "❌ Installation failed. Make sure device is connected with USB debugging enabled."
    fi
else
    echo "❌ Build failed!"
fi

cd ..
echo "✨ Done!"