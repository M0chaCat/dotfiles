#!/bin/bash

# Define root directory variable (default to user's home directory)
ROOT_DIR="$HOME"

# Function to copy files dynamically based on the paths
copy_files() {
    local src=$1
    local dest=$2

    if [ "$VERBOSE" = "true" ]; then
        echo "Copying:"
        echo "  From: $src"
        echo "    To: $dest"
    fi

    mkdir -p "$(dirname "$dest")"

    cp -R "$src" "$dest"

    if [ "$VERBOSE" = "true" ]; then
        echo "Copied $src to $dest"
    fi
}

# Function to handle verbose mode
enable_verbose() {
    VERBOSE="true"
}

# Function to display usage information
display_usage() {
    echo "Usage: $0 [-v] <installer_package>"
    echo "Options:"
    echo "  -v    Enable verbose mode"
}

# Clean up function
cleanup() {
    # Clean up temporary directory
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
}

# Trap function to ensure cleanup on exit
trap cleanup EXIT

# Check if any arguments are provided
if [ $# -eq 0 ]; then
    display_usage
    exit 1
fi

# Parse command-line options
while getopts ":v" opt; do
    case $opt in
        v)
            enable_verbose
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            display_usage
            exit 1
            ;;
    esac
done
shift $((OPTIND - 1))

# Check if installer package argument is provided
if [ -z "$1" ]; then
    echo "Installer package argument missing."
    display_usage
    exit 1
fi

# Installer package file path
installer_package="$1"

# Base directory for the installer files
BASE_DIR=$(dirname "$installer_package")

# Create temporary directory for extraction
TEMP_DIR="./temp_install"
mkdir -p "$TEMP_DIR"

# Extract the .PawInstaller package
if [ "$VERBOSE" = "true" ]; then
    echo "Extracting $installer_package..."
fi
unzip -q "$installer_package" -d "$TEMP_DIR"

# Check if extraction was successful
if [ $? -ne 0 ]; then
    echo "Failed to extract $installer_package"
    exit 1
fi

# Directory where installer files are located
FILES_DIR="$TEMP_DIR/testinstaller/Files"

# Check if the Files directory exists
if [ ! -d "$FILES_DIR" ]; then
    echo "Files directory not found in $installer_package"
    exit 1
fi

# Copy files from Files directory to their destinations
cd "$FILES_DIR"
for dir in *; do
    if [ -d "$dir" ]; then
        dest_path="$ROOT_DIR/$dir"

        # Resolve destination path
        dest_path=$(eval echo "$dest_path")

        # Update destination path to use /Users/$USER for special paths
        case $dir in
            "@user")
                copy_files "$dir" "/Users/$USER"
                ;;
            "@documents")
                copy_files "$dir" "/Users/$USER/Documents"
                ;;
            *)
                copy_files "$dir" "$dest_path"
                ;;
        esac
    fi
done