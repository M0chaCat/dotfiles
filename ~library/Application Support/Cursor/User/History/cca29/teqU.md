# Meowbrowz has been archived. [Learn more here.](https://scratch.mit.edu/discuss/post/6397247/)

<img width="1500" alt="Meowbrowz' banner" src="https://user-images.githubusercontent.com/86574651/147876286-e0f179a9-b456-4c82-b672-380c0a30da3f.png">

<p align="center">
  <img src="https://img.shields.io/github/v/release/mystpi/Meowbrowz?style=for-the-badge">
  <img src="https://img.shields.io/github/languages/top/mystpi/Meowbrowz?color=yellow&style=for-the-badge">
  <img src="https://img.shields.io/github/downloads/mystpi/Meowbrowz/total?style=for-the-badge">
  <br>
  <a href="https://www.producthunt.com/posts/Meowbrowz?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-Meowbrowz" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=322567&theme=light" alt="Meowbrowz - A private, fast, and beautiful web browser | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

Meowbrowz is a private, fast, and beautiful web browser that's created with Electron and styled with Tailwind CSS. Enjoy a clean and unique experience while surfing the web.

In this age where many browsers track their users, it's nice to have a break from telemetry and browse privately. Meowbrowz never collects any data, and is 100% telemetry free!

New things are constantly being added to Meowbrowz, so be on the lookout for new releases. You can view some features and fixes that are in the works on [this board](https://github.com/MystPi/Meowbrowz/projects/1).

## Screenshots
![image](https://user-images.githubusercontent.com/86574651/158018722-68023be6-b8a4-43b8-b1c9-16bdf886c744.png)

![image](https://user-images.githubusercontent.com/86574651/158018748-45ddc408-30b9-4baf-8ee0-4cad28fdbd48.png)

## Development
```bash
# Clone the repo
git clone https://github.com/MystPi/Meowbrowz.git
cd Meowbrowz

# Install the dependencies
npm install

# Start the app
npm run dev
# This runs `npm start` and `npm run tailwind` concurrently
```

## Building the app
```bash
# Clone the repo
git clone https://github.com/MystPi/Meowbrowz.git
cd Meowbrowz

# Install the dependencies
npm install

# Make the app
npm run make

# The built app should be located at `./out/make/{filetype}/{architecture}/{filename}.{filetype}`
# Eg. `./out/make/deb/arm64/Meowbrowz_1.0.0_arm64.deb`
```
