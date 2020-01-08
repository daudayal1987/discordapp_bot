#DISCORD APP BOT Example
This is a sample bot created to demonstrate how discord app bot works. It currently support 3 commands / messages
1. Reply hey to your hi
2. Search web using google apis for given phrase using (!google {phrase}) command
3. Search your recent search history by command (!recent {phrase})

#Requirements
1. NodeJS 8, MongoDB >=3.6
It store all the search queires in mongodb to make it persistant.

All the necessary settings are stored in .env file. So please update this file before start using this application.

#How to Run
1. Clone this repo
2. Do `npm install`
3. Rename `.env.sample` to `.env`
4. Update `.env` file
5. Run `npm start`