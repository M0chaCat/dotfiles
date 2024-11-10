#!/bin/bash

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

# Get the current user's home directory
CURRENT_USER=$(logname)
USER_HOME=$(eval echo ~$CURRENT_USER)

# Copy files from Files directory to their destinations
cd "$FILES_DIR"
for dir in *; do
    if [ -d "$dir" ]; then
        dest_path="$ROOT_DIR/$dir"

        # Check if running with elevated privileges
        if [ "$(id -u)" -eq 0 ]; then
            # Update destination path to allow copying to other directories
            dest_path="/$dir"
        else
            # Resolve destination path
            dest_path=$(eval echo "$dest_path")
        fi

        # Update destination path to use the current user's home directory for special paths
        for special_dir in "@applicationsupport" "@appsup" "@documents" "@docs" "@applications" "@apps" "@desktop" "@desk" "@preferences" "@prefs" "@library" "@libs"; do
            if [ "$dir" = "$special_dir" ]; then
                for file in "$dir"/*; do
                    if [ -f "$file" ]; then
                        case $special_dir in
                            "@applicationsupport" | "@appsup")
                                dest_dir="$USER_HOME/Library/Application Support"
                                ;;
                            "@documents" | "@docs")
                                dest_dir="$USER_HOME/Documents"
                                ;;
                            "@applications" | "@apps")
                                dest_dir="/Applications"
                                ;;
                            "@desktop" | "@desk")
                                dest_dir="$USER_HOME/Desktop"
                                ;;
                            "@preferences" | "@prefs")
                                dest_dir="$USER_HOME/Library/Preferences"
                                ;;
                            "@library" | "@libs")
                                dest_dir="$USER_HOME/Library"
                                ;;
                        esac

                        if [ "$VERBOSE" = "true" ]; then
                            echo "Attempting to copy $file to $dest_dir/$(basename "$file")"
                        fi
                        copy_files "$file" "$dest_dir/$(basename "$file")"
                    fi
                done
            fi
        done

        if [ -f "$dir" ]; then
            if [ "$VERBOSE" = "true" ]; then
                echo "Attempting to copy $dir to $dest_path"
            fi
                copy_files "$dir" "$dest_path"
        fi
    fi
done

# Change back to the original directory to delete the temporary directory
cd "$BASE_DIR"
rm -rf "$TEMP_DIR"