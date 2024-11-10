#!/bin/bash

# Clean up 
rm -rf ~/dotfiles/oþer/boot
rm -rf ~/dotfiles/oþer/whoogle-search
rm ~/dotfiles/assets/cuteterminal.icns
rm -rf ~/dotfiles/dotconfig/fish
rm -rf ~/dotfiles/dotconfig/iterm2
rm -rf ~/dotfiles/dotconfig/sketchybar
rm -rf ~/dotfiles/dotconfig/spicetify
rm -rf ~/dotfiles/~library/Application\ Support/Cursor
rm -rf ~/dotfiles/~library/Application\ Support/Pock
rm -rf ~/dotfiles/~library/Application\ Support/iTerm2
rm -rf ~/dotfiles/~library/Application\ Support/uBar


# Copy files/folders from their original locations into the dotfiles repo
cp -r ~/Documents/boot ~/dotfiles/oþer/boot
cp -r ~/whoogle-search ~/dotfiles/oþer/whoogle-search
cp ~/Documents/cuteterminal.icns ~/dotfiles/assets/cuteterminal.icns

# Copy directories from ~/.config into the dotfiles repo (if symlinked)
cp -r ~/.config/fish ~/dotfiles/dotconfig/fish
cp -r ~/.config/iterm2 ~/dotfiles/dotconfig/iterm2
cp -r ~/.config/sketchybar ~/dotfiles/dotconfig/sketchybar
cp -r ~/.config/spicetify ~/dotfiles/dotconfig/spicetify

# Copy subdirectories from ~/Library/Application Support into dotfiles
cp -r ~/Library/Application\ Support/Cursor ~/dotfiles/~library/Application\ Support/Cursor
cp -r ~/Library/Application\ Support/Pock ~/dotfiles/~library/Application\ Support/Pock
cp -r ~/Library/Application\ Support/iTerm2 ~/dotfiles/~library/Application\ Support/iTerm2
cp -r ~/Library/Application\ Support/uBar ~/dotfiles/~library/Application\ Support/uBar