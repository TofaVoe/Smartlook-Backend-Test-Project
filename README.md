# Smartlook-Backend-Test-Project
Smartlook Backend Test Project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

#### Docker

[Download here](https://hub.docker.com/?overlay=onboarding)

* If using Windows 10 or higher you need to have [wsl2 working](https://docs.microsoft.com/en-us/windows/wsl/install) 

### Installing / Running App

A step by step that tell you how to get a development env running

All you have to do to startup the app is running following command from *terminal/CDM/PowerShell* in project folder
```
docker-compose up --build
```
App is available at address: http://localhost:3000/

### Testing
I have some issues testing with jest (you can run ```npm run test``` from container)
For testing purposes I used [Postman app](https://www.postman.com)
[Postman documentation](https://documenter.getpostman.com/view/3572858/UVkvKDEG)
or you can import into postman json from ```.docs/Smartlook project.postman_collection.json```
## Author

Krystof Kosut
