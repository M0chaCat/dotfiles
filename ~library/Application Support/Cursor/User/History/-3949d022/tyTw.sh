# Function to copy files dynamically based on the paths
copy_files() {
    local src=$1
    local dest=$2

    echo "Copying from $src to $dest"

    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$dest")"

    # Copy files to the destination
    cp -R "$src" "$dest"
}

# Base directory for the installer files
BASE_DIR=$(dirname "$0")

# Navigate to the directory containing the .PawInstaller package
cd "$BASE_DIR"

# Unzip the .PawInstaller package
unzip -q "$1" -d ./temp_install

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