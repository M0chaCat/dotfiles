#!/bin/bash

# Get the current user's home directory
CURRENT_USER=$(logname)
USER_HOME=$(eval echo ~$CURRENT_USER)

# Define root directory variable (default to user's home directory)
ROOT_DIR="$USER_HOME"

# Function to copy files dynamically based on the paths
copy_files() {
    local src=$1
    local dest=$2

    if [ "$VERBOSE" = "true" ]; then
        echo "Copying from $src to $dest"
    fi

    mkdir -p "$(dirname "$dest")"

    # Use sudo to copy files if running with elevated privileges
    if [ "$(id -u)" -eq 0 ]; then
        sudo cp -r "$src" "$dest"
    else
        cp -r "$src" "$dest"
    fi

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
    echo "Usage: $0 [-v] <application_package>"
    echo "Options:"
    echo "  -v    Enable verbose mode"
}

# Define a function to clean up the temporary directory
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
    echo "Application package argument missing."
    display_usage
    exit 1
fi

# Validate Application package path
if [ ! -f "$1" ]; then
    echo "Application package not found."
    display_usage
    exit 1
fi

# Application package file path
application_package="$1"

# Base directory for the installer files
BASE_DIR=$(dirname "$application_package")

# Create temporary directory for extraction
TEMP_DIR="./temp_install"
mkdir -p "$TEMP_DIR"

# Extract the .Paw package without prompting for .DS_Store
if [ "$VERBOSE" = "true" ]; then
    echo "Extracting $application_package..."
fi
unzip -q -o "$application_package" -d "$TEMP_DIR"

# Check if extraction was successful
if [ $? -ne 0 ]; then
    echo "Failed to extract $application_package"
    exit 1
fi

# Extract the application package name without the path and extension
APP_PACKAGE=$(basename "$application_package" | sed 's/\.paw$//')
FILES_DIR="$TEMP_DIR/$APP_PACKAGE/Install"

# Check if the Files directory exists
if [ ! -d "$FILES_DIR" ]; then
    echo "Install directory not found in $application_package"
    exit 1
fi

# Copy files from Files directory to their destinations
cd "$FILES_DIR"
for dir in *; do
    if [ -d "$dir" ]; then
        dest_path="$ROOT_DIR/$dir"

        # Check if running with elevated privileges
        if [ "$(id -u)" -eq 0 ]; then
            # Update destination path to allow copying to other directories
            case $dir in
                "@applications" | "@apps")
                    dest_path="/Applications"
                    ;;
                "@documents" | "@docs")
                    dest_path="$USER_HOME/Documents"
                    ;;
                "@desktop" | "@desk")
                    dest_path="$USER_HOME/Desktop"
                    ;;
                "@preferences" | "@prefs")
                    dest_path="$USER_HOME/Library/Preferences"
                    ;;
                "@library" | "@lib")
                    dest_path="$USER_HOME/Library"
                    ;;
                *)
                    # Handle other special directories or default behavior
                    dest_path="/$dir"
                    ;;
            esac
        else
            # Resolve destination path
            dest_path=$(eval echo "$dest_path")
        fi

        for file in "$dir"/*; do
            if [ -f "$file" ]; then
                if [ "$VERBOSE" = "true" ]; then
                    echo "Attempting to copy $file to $dest_path/$(basename "$file")"
                fi
                copy_files "$file" "$dest_path/$(basename "$file")"
            fi
        done
    fi
done

# Change back to the original directory to delete the temporary directory
cd "$BASE_DIR"
rm -rf "$TEMP_DIR"