#!/bin/bash
echo "meow!!!"

# func to lock mouse for 22 sec
mouse_movement() {
	duration=22 # vid is 22secs
	start_time=$(date +%s)
	while true; do
		osascript <<EOF
		use framework "Foundation"
		use framework "CoreGraphics"

		set cursorPoint to current application's NSMakePoint(1000, 500)
		current application's CGWarpMouseCursorPosition(cursorPoint)
EOF
		current_time=$(date +%s)
		elapsed_time=$((current_time - start_time))
		if [ $elapsed_time -ge $duration ]; then
			break
		fi
		sleep 0.01
	done
}

# Run the video and the mouse movement function simultaneously
# mpv --fs /Users/arcane/Documents/boot/boot.mp4 &
# mouse_movement &


# hfs
#osascript <<EOF
#tell application "iTerm"
#	create window with default profile
#	tell current session of current window
#		write text "/Users/arcane/hfs-mac-arm/hfs"
#	end tell
#end tell
#EOF

# Start a new tmux session and start hfs
tmux new-session -d -s hfs-session '~/hfs-mac-arm/hfs'

# Start a new tmux session and start Whoogle
tmux new-session -d -s whoogle-session 'cd ~/whoogle-search && source venv/bin/activate.fish && ./run'

# Start a new tmux session and start Nekobot
tmux new-session -d -s nekobot-session 'source ~/redenv/bin/activate && redbot nekobot'

# Start a new tmux session and update Spicetify
tmux new-session -d -s spicetify-session 'spicetify update'

# openrecall
# tmux new-session -d -s openrecall-session 'python3 -m venv /Users/arcane/venv && source /Users/arcane/venv/bin/activate && python3 -m openrecall.app'

# sketchybar
tmux new-session -d -s sketchybar-session 'sketchybar'




# AppleScript function to switch spaces
switch_space() {
	osascript -e "
	tell application \"System Events\"
		key down control
		key code $1
		key up control
	end tell"
}
KEY_CODES=(0 1 7)

# Delay time in seconds
DELAY=0.5

# Iterate through each key code and run the command
for key_code in "${KEY_CODES[@]}"; do
	# Switch to the space
	switch_space $key_code
	
	# Wait for a bit to ensure the space has switched
	sleep $DELAY

	# Replace the '1' in the file path with the current key_code
	nohup /Applications/Neko.app &
	# java -jar /Users/arcane/Documents/boot/ShimejiEE/$key_code/target/ShimejiEE/ShimejiEE.jar &
done


# open boot.html with HFS
#osascript <<EOF
#tell application "Arc"
#	activate
#	tell front window
#		make new tab with properties {URL:"http://127.0.0.1:1079/boot/boot.html"}
#	end tell
#end tell
#EOF

exit
