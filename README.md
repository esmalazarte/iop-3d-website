# iop-3d-website
This project is the 3D implementation of the IOP website created using A-Frame, Blender, and Asset Forge. The 3D space contains content found in the IOP WordPress site such as the News/Announcements, About section, Project Portfolio, and Publications.  

## Installation
Clone this repository with 
```
git clone https://github.com/esmalazarte/iop-3d-website.git
```
Then navigate to the iop-3d-website/ directory and run
```
npm i
```

## Usage
### Without a server
This repository includes an Express web server for running on a personal computer. Simply run
```
npm start
```
Make sure to run `npm i` first to install the dependencies

### Deployed on a server
Serve the `index.html` file in this repository i.e. https://example.com/iop-3d-website/index.html

## Files and Directories
### index.html
This file is the main entry point of the project. It contains most of the static content manually created with A-Frame and imports assets and dynamic content to display the scene. Serve this file to view the actual IOP 3D website

### src/
This folder contains scripts to dynamically generate the content inside the 3D website. Each file contains A-Frame components that can be placed inside the main index.html file. Some components must be manually placed using the `position` attribute of the A-Frame entity.
- about.js - generates profiles in the About room
- content.js - fetches content from WordPress and generates text entities to display them
- entities.js - miscellaneous objects 
- home.js - homepage content such as news
- navigation.js - movement around the 3D website such as teleportation, and navigating to or from it such as external links
- projects.js - generates project spaces inside the Projects room
- publications.js - shows viewable research in the Publications room
- simple-navmesh-constraint.js - navmesh to constrict movement inside the 3D space. Created by AdaRoseCannon at the aframe-xr-boilerplate repository https://github.com/AdaRoseCannon/aframe-xr-boilerplate

### models/
This contains the exported 3D models of the entire 3D world and other miscellaneous models such as the navmesh. All files are exported in the gltf file format.

### assets/
This folder contains assets such as images of IOP's people, partners, projects, and other icons that are displayed in their respective locations.

### assetforge/
This directory contains the raw Asset Forge projects used to create the 3D models of the website.   
Note: Extract the included Collections.zip folder to the Collections folder of your Asset Forge installation in order for the objects to appear correctly inside Asset Forge when editing the models.