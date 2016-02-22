# Jodelihood

![Jodelihood]()

The smartphone application [Jodel](https://jodel-app.com) lets users anonymously post short messages and photos that are visible to other nearby users. Jodlihood shows a map of all recent posts made by users that are near the visitor of this website.

Jodel is meant to be an anonymous community in which the author of each post is unknown and personal information is kept, well, personal. The company behind Jodel emphasize this on their website as part of the ["What Jodel is all about?"](https://jodel-app.com/whats-jodel/) section. As of February 22, 2016 the company writes that the service lets you *"connect with fellow students **without exposing your personal information**"*. This is not the case. Personal information is unnecessarily exposed.

**Please note** that while all of this sounds very scary, the locations sent from the backend to the app has a radius of about 500 meters. However, personal data is still unnecessarily exposed to the public.
  
![Screenshot]()

## Features

- Automatically authenticates with the Jodel service using your current location
- View Jodel posts near you on a map
- View the vote count of each post
- Fully responsive

Pull requests for new features and bug fixes are welcome.

## Usage

In order to run the application, you should first bundle the files using `npm run deploy`. Thereafter you can run the application in production using `npm start`. In order to run the application in a development environment, you should run `npm run dev`.