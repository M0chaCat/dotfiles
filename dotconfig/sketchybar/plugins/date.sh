#!/bin/sh

# The $NAME variable is passed from sketchybar and holds the name of
# the item invoking this script:
# https://felixkratz.github.io/SketchyBar/config/events#events-and-scripting

# sketchybar --set $NAME label="$(date '+%a %b %-d %H:%M:%S')"

# Define day and month icon mappings
DAY_MAP="Tue:󱤺 Wed:󱥪 Thu:󱤗 Fri:󱤛 Sat:󱤰 Sun:󱥤 Mon:󱥗"
MONTH_MAP="Dec:󱤺󱥲 Jan:󱤺󱤕 Feb:󱤺󱥪 Mar:󱤺󱥑 Apr:󱤺󱤫 May:󱤺󱤗 Jun:󱤺󱤚 Jul:󱤺󱤝 Aug:󱤺󱤔 Sep:󱤺󱥋 Oct:󱤺󱤃 Nov:󱤺󱥢"

# Get the day and month in abbreviated format
DAY_NAME=$(date '+%a')   # Abbreviated day name (Mon, Tue, ...)
MONTH_NAME=$(date '+%b') # Abbreviated month name (Jan, Feb, ...)

# Function to get custom symbol from a map
get_icon() {
  local map="$1"
  local key="$2"
  echo "$map" | grep -oE "$key:[^ ]+" | cut -d':' -f2
}

# Replace the day and month with custom icons
CUSTOM_DAY=$(get_icon "$DAY_MAP" "$DAY_NAME")
CUSTOM_MONTH=$(get_icon "$MONTH_MAP" "$MONTH_NAME")
DATE=$(date '+%-d')      # Day of the month
TIME=$(date '+%H:%M:%S') # Time in hours:minutes:seconds
YEAR=$(date '+%y')

# Fallbacks in case of missing custom icons
[ -z "$CUSTOM_DAY" ] && CUSTOM_DAY="$DAY_NAME"
[ -z "$CUSTOM_MONTH" ] && CUSTOM_MONTH="$MONTH_NAME"

# Update sketchybar label with custom names
sketchybar --set "$NAME" label.font="nasin-nanpa:Normal:14.0" label="${CUSTOM_DAY}/${CUSTOM_MONTH}/"
