# TravelBug

### Welcome to your new favorite travel-tracker!

This was designed to be my submission for Turing's Front End Mod 2 final solo project

You can find my GitHub [here](https://github.com/Cyanne-Jones).

## Get started!

Clone down this repository, cd into the root directory and run `npm start` in the terminal to boot up the local server. Then clone down [this repo](https://github.com/turingschool-examples/travel-tracker-api) outside of the TravelBug directory, cd into it and run `npm start` to start up the local api server. Then finally open the app at http://localhost:8080/

## Usage

Now that you've got both local servers running, just log in using your credentials of `traveler#` for a username where the `#` is a number anywhere between 1 and 50 (ex: `traveler42`), and the password is `traveler`. From there, you'll be taken to your dashboard! This shows all your past, present and future trips sorted beautifully with images of the places you've gone, when you were there and how many people you traveled with! 

### Would you like to book a new trip?

Of course you do! Simply choose a destination from the drop down menu, or begin typing out your destination so you don't have to scroll through so many cities! Then choose how many people you're traveling with, how many days you'd like to be away for, and the date on which you'd like to leave and BOOM! you know how much this trip will cost (with a 10% traveler agent fee), and it'll appear in your upcoming trips with a status of `pending` until one of our travel agents is able to process your request!

## See it in action!

![travel-tracker](https://user-images.githubusercontent.com/98280256/173420690-a4ebf199-1f3a-4df3-8442-e8402c70e1dd.gif)


## Technologies used

- Vanilla JavaScript
- Fetch API
- Mocha/Chai testing
- Webpack
- CSS
- HTML
- [dayjs](https://day.js.org/)
- [Figma](https://www.figma.com/file/qVkI7hcJwGI6WCXmGxxOpI/Untitled?node-id=0%3A1)
- [Trello project boards](https://trello.com/b/Qt4QUJrt/travel-tracker)
- [Excalidraw for designing class architecture](https://excalidraw.com/#json=MiQx4bz8vQe3LGsoOnunp,lJxD5S1h6pQpo6K3G9d__A)
- [Procreate to examine design for optimized HTML construction](https://i.imgur.com/729DhnL.jpg)

## Wins and Challenges

#### Wins

- Teaching myself my first JS library, dayjs (Such a cool and lightweight tool!)
- Tackling class architecture from scratch
- Practicing design using Figma
- Having my good friend [Corinne](https://github.com/CorCanavan) write some of the most beautiful and thought out PR reviews 
- Making this project 100% tabbable, and pass the Lighthouse accessibility test with a 100%! 💯

#### Challenges

- Remembering to make sad paths in my test files
- Keeping my functions SRP and not making them too clunky
- Not being able to learn how to use [Glidejs](https://glidejs.com/) in time to get this project done (also such a cool tool I want to prctice using asap!)

## Future Ideas

- Use Glidejs to be able to show multiple pieces of information in a small area
- Add a travel agent interaction page where the travel agent can log in and approve or delete user-requested trips
- Animations & sound
- More destinations! 
