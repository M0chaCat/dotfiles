#!/bin/bash

# Define root directory variable (default to user's home directory)
ROOT_DIR="$HOME"

# Function to copy files dynamically based on the paths
copy_files() {
    local src=$1
    local dest=$2

    if [ "$VERBOSE" = "true" ]; then
        echo "Copying from $src to $dest"
    fi

    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest")"

    # Copy files to the destination
    cp -R "$src" "$dest"

    if [ "$VERBOSE" = "true" ]; then
        echo "Copied $src to $dest"
    fi
}

# Base directory for the installer files
BASE_DIR=$(dirname "$0")

# Handle command-line arguments
if [ "$1" = "-v" ]; then
    VERBOSE="true"
    shift  # Remove -v from arguments
else
    VERBOSE="false"
fi

# Check if an installer package argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 [-v] <installer_package>"
    exit 1
fi

# Installer package file path
installer_package="$1"

# Navigate to the directory containing the .PawInstaller package
cd "$BASE_DIR"

if [ "$VERBOSE" = "true" ]; then
    echo "Extracting $installer_package..."
fi

# Unzip the .PawInstaller package with verbose output
unzip -q "$installer_package" -d ./temp_install

# Ensure the temp_install directory exists and contains a Files directory
mkdir -p ./temp_install/Files

# Copy all files from temp_install/Files to their destinations
for file in ./temp_install/Files/*; do
    if [ -f "$file" ]; then
        # Extract file name without path
        filename=$(basename "$file")

        # Determine destination path (expand ~ and replace root directory)
        dest_path=$(echo "$filename" | sed 's#~/#'"$ROOT_DIR"'/#')

        # Copy file to the destination
        copy_files "$file" "$dest_path"
    fi
done

echo "Installation complete!"

# Clean up temporary directory
rm -rf ./temp_install