---
layout: layouts/post.liquid
tags: posts
title: Building and hosting a Discord bot
date: 2020-07-30
description: Discord is a great product that has been a source of joy for me, personally. This time, I'm gonna take you through all the steps needed to take your first Discord bot online, and host it safely on the cloud, for free.
keywords: tutorial, discord, bot, heroku, ruby, zeitwerk, sinatra
---

Discord is one of the premier instant communication platforms on the web right now. Free, easy to use, and just cool, Discord is one of the main hangout apps for gamers, developers, and just overall tech people. One of the coolest things about it is the ability to install bots on your servers that make some cool stuff. Bots that play music, text-based RPGs, dice rollers for RPGs (I made one), meme generators, and many more. In this blog post, I'm going to walk you through on all the steps needed to make your bot and host it for free (kinda free), provided you have some basic `ruby` and `git` knowledge.

## Getting started

Why Ruby? Well, no reason at all. It's just my favorite language at the moment of writing. Its also the language I have been using at work for these past few years. And, I find it's just so simple and easy to understand for people who use it sparingly.

And why Heroku? It's a hosting platform that integrates with Github and automatically provides a CI/CD pipeline that continuously deploys your changes. This way you can make changes to your bot, commit that with `git` and your bot will just update itself on Heroku. We just need a little hack to make it work there but will get to that.

So some prerequisites:

- Discord account
- Github account
- Heroku account
- Basic Ruby knowledge
- Ruby (latest version) and Git installed and available on your path

After you create all of these accounts, make sure you create a new Discord app. For that visit [their developer portal](https://discord.com/developers). Click `New Application` on the top right corner and follow along.

![Discord app client id](/images/discord1.png)

After creating it, on the bot's main page you can take note of the `CLIENT ID`, we are going to need it. Then go to the `Bot` tab on the side menu and. On that new screen, you can add a bot user to your application. Do it and take note of the `TOKEN` value also. All the other options are not needed for now, but you'll probably explore those later on as you develop your bot.

![Discord bot token](/images/discord2.png)

## The bot

Now make sure your directory dedicated to this project and also don't forget to initialize a git repo, we are going to need it. Now, like most ruby projects, let's start with a `Gemfile`.

```ruby
source "https://rubygems.org"

ruby "2.7.1"

gem "discordrb"
gem "dotenv"
gem "rake"
gem "zeitwerk"
```

After creating and saving this file, run `bundle install` to install these dependencies.

Now, what do these gems do? Let's go through them:

- `discordrb` - this is a wrapper of the Discord API. We are going to need this to effectively communicate with Discord
- `dotenv` - we are going to use this to load the secret keys that we got from Discord
- `rake` - the classic ruby task runner. We are going to use this to start the app.
- `zeitwerk` - a class loader. We'll set up this soon.

Now, let's write the code that will connect to discord and handle incoming commands. Let's place it on `src/discord_bot.rb`.

```ruby
module DiscordBot
  throw "Lacking required secrets!" unless ENV["TOKEN"] && ENV["CLIENT_ID"]

  @bot = Discordrb::Bot.new(
    token: ENV["TOKEN"],
    client_id: ENV["CLIENT_ID"],
  )

  puts "This bot's invite URL is #{@bot.invite_url}"
  puts "Click on it to invite it to your server"

  @bot.message(with_text: "!ping") do |event|
    event.respond "pong"
  end

  def self.run
    @bot.run
  end

  def self.invite_url
    @bot.invite_url
  end
end
```

We use the `discordrb` library to create a bot instance using the values from our shell environment.

Then, we define a handler for a bot command. The handler will intercept every message that matches `!ping` and respond to it with a `pong` message.

Then we just declare methods to run the bot and get the invite URL. The bot `run` method connects to Discord via a persistent websocket connection. That's how our bot reads all of the incoming messages from the servers it's installed in.

To correctly set the environment, create a file called `.env` and add the values you got on the Discord developer portal. The `dotenv` gem will take care of loading all of those values into the environment, just when we run our application. On Heroku we will define these variables on their dashboard. But for now, the `.env` file.

```bash
CLIENT_ID=the client id you got on discord dev
TOKEN=the client secret you got on discord dev
```

**DO NOT FORGET TO ADD THIS FILE TO THE GITIGNORE OF YOUR PROJECT** otherwise, you are leaking secret information to the public.

Now to wrap everything up, let's write our `Rakefile` so that we can run our discord bot.

```ruby
ENV["RUBY_ENV"] ||= "development"
require "bundler/setup"
require "dotenv/load" if ENV["RUBY_ENV"] != "production"

Bundler.require(:default, ENV["RUBY_ENV"])
loader = Zeitwerk::Loader.for_gem
loader.push_dir(File.dirname(__FILE__) + "/src")
loader.setup

task :bot do
  DiscordBot.run
end
```

We wrap the entire file in a conditional that checks if we are running the file with ruby and not requiring it from another ruby file. This is usually done on ruby scripts that are meant to be executed from the command line.

Then we require the `bundler/setup`, so we can automatically require all the gems into the project. We then require `dotenv/load` only if we are outside of a production environment. During production, we don't want to load environment variables from the `.env` file, we just want to load them from the Heroku configuration.

We also set up `zeitwerk`, which will automatically require our own files. In this case, we have a `src/discord_bot.rb` file which defines a `DiscordBot` module. Check [this link](https://github.com/fxn/zeitwerk#file-structure) for more info on Zeitwerk file structure. We push the `src` dir as a root dir for our code and then we run setup to load it.

Then we define the task to run the bot. Then, to start it, just run `bundle exec rake bot`. Now use the invite URL that shows up in the console and try it on your server! The bot should appear on the online user list and it should respond to a `!ping` message with `pong`.

## How to put this online

Now the bot works great and it's even ready for deployment. You host this on any server that you might have handy. Just send this code over and run `rake bot`. But, most of us don't have handy servers there. This is where Heroku comes in.

Heroku is a hosting platform for web apps. _Web apps_ is an important term. Meaning that Heroku expects that your app is an HTTP server of some sort, that binds to a port and responds to incoming request. If you deploy our code to Heroku, it will work for a couple of minutes before shutting down. This is because Heroku shuts down any app that does not bind to any port! So we just need to add a webserver to it.

### Sinatra

We are going to spin up a very simple Sinatra webserver that will have a simple HTML page that will contain the invite URL for our bot. It's pretty useful stuff. You just share the Heroku app URL with your friends and they'll be able to invite the bot to their servers.

Let's go back to our Gemfile. Just the add `gem "sinatra"` to it and then run `bundle install` again.

Now let's set up our webserver. We need to create a folder at `src/webserver` and then one more subfolder at `src/webserver/views`. The `views` folder will hold all of our HTML templates. In this case, just one.

Then we create our HTML template at `src/webserver/views/index.erb`.

```erb
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The greatest bot</title>
    <style>
      body {
        margin: 40px auto;
        max-width: 650px;
        line-height: 1.6;
        font-size: 18px;
        color: #444;
        padding: 0 10px;
      }
    </style>
  </head>
  <body>
    <h1>Greatest Bot</h1>

    <p>
      I am the greatest bot. Add me to your server with my glorious
      <a href=<%= @url %>>invite url</a>.
    </p>

    <p>
      This is a good place to post instructions on how
      to use your bot by the way!
    </p>
  </body>
</html>
```

Then create a `src/webserver.rb` file and a `src/webserver` folder. On our `src/webserver.rb` we are going to define the homepage route of our web app.

```rb
class Webserver < Sinatra::Base
  set :views, File.dirname(__FILE__) + "/webserver/views"

  get "/" do
    @url = DiscordBot.invite_url

    erb :index
  end
end
```

When we receive a request on the `/` route, we set the `@url` with the bot's invite URL. Then we render the `index.erb`.

Finally, we just need to add another task to our `Rakefile` file to boot up the webserver and the bot at the same time. Add this to the `Rakefile`.

```ruby
task :web do
  Rack::Server.start(
    Port: ENV["PORT"] || 4567,
    app: Webserver.new,
  )
end

task :all do
  Process.fork { Rake::Task["bot"].invoke }
  Process.fork { Rake::Task["web"].invoke }
  Process.waitall
end
```

The web task boots up a webserver that listens for requests at the port defined on our environment or 4657. By default, Heroku adds a `PORT` variable that holds the port we need to bind to. On the other hand, the `all` task spawns two processes that will run at the same time. One for the webserver and other for the Discord bot itself. This will allow us to run the entire thing for free, more details on that later.

During development, you can always just work on the bot or the webserver, or both at the same time.

The final step we need is to create the `Procfile`. On this file, we specify what Heroku will run. In this case, we want Heroku to run everything in one dyno, the `web` dyno. Heroku can run multiple `dynos` of different kinds. We could even have separate dynos, one for the bot and other for the webserver, but to fit on the free tier, we can only use one without running into limits.

```ruby
web: rake all
```

Now, to run the bot and the server at the same time do `rake all`. This will start both scripts and it will display its outputs on different colors. Very useful for debugging and seeing what's happening. Oh, and you can visit your shiny website at [http://localhost:5000](http://localhost:5000).

Remember, that with this setup you can always run just the bot or just the webserver locally. `rake bot` or `rake web` will do the trick. Just in case you don't want to work on the entire thing.

### Heroku

Now, to deploy all of this to Heroku make sure you have all of this code on a Github repo. Then create a new app on Heroku and use the `Connect with Github` function. Then just follow to connect with your Github repo. Finally, click the `Deploy branch` button to deploy your code. You can optionally enable automatic deploys so every time you commit to master, you trigger a new build.

Your app will probably not work right away. You need to set the correct environment variables for it to work. Go to the `Settings` tab on Heroku. Then on the `Config Vars` zone click reveal and then introduce the following variables:

```bash
RUBY_ENV=production
CLIENT_ID=your client id from discord dev portal
TOKEN=your secret token id from discord dev portal
```

You can use the same values you have on your `.env` file for the discord secrets. But note that is a best practice to have different apps and different values for the development and production build. If your bot is used by many people, it's probably a bad idea to use the same bot app during development, because it's already running an instance on Heroku and it might introduce downtime for its users. But all it takes is just creating another app as we did earlier, and use those new credentials here on Heroku.

After setting the environment variables, Heroku should automatically re-release the app. Click the `Open App` in the top-right area. It should take you to the website with the invite URL. Use it for your server, then test the bot as you did during development. By the way, the server on your own machine, in case you are using the same credentials for both production (Heroku) and development, just to make sure there are no interferences.

### Disclaimer

Heroku offers a _hobby_ tier that allows you to host an app for free, provided it runs only a few hours per day. Heroku automatically kills your app after it idles for a while. That's based on web requests, so even if people are using the bot on Discord, that doesn't count as traffic for Heroku. Our bot uses websockets to send and receive messages from Discord, so that doesn't count for Heroku. More info on [their docs page](https://link) about the free tier.

Though, if you add a credit card to your account to validate it, you get enough hours to run a single dyno the entire month 24/7. By fitting all of our tasks into the `rake all` task, we can just consume hours in a single dyno. Not ideal, but it works for our use case.

## Next Steps

Now the bot is up running, but it doesn't do much. The hardest part of getting it up and running on the outside world is done, but now it's up to you to fill the rest in.

You should take a look at `discordrb` [wiki page](https://github.com/discordrb/discordrb/wiki) and also their [API documentation](https://www.rubydoc.info/github/meew0/discordrb/Discordrb) for more advanced stuff. Their API is plenty easy to work with.

You may also see a "real" bot in action using this template and these libraries. I made a bot a while back to roll dice. I use it just for fun and some online Dungeons & Dragons sessions. You can check the code [here on my Github repo](https://github.com/jfranciscosousa/dicer) and you can also invite it to your server by visiting [it's home page](https://thedicer.herokuapp.com).

## A final note

This will work for hobby projects of sorts, but any bot with a significant amount of servers will perhaps need a little more horsepower to run, and the hobby tier from Heroku won't cut it. Also, running two processes on one dyno is not the best way to go about a performant. But hey! We usually say that "premature optimization is the root of all evil", so don't sweat it. When things get slow, just split off the webserver and the bot in different dynos and boost them (that won't be free anymore though).

I packaged the teachings of this blog post into a starter repo that you can use instead of following these steps. I'll keep that repo updated but there might be the chance that the code is slightly different. People might find better ways to do things and I'll happily accept that! Anyway, the repo's README will get you sorted. Check it at [my Github repo](https://github.com/jfranciscosousa/discordrb-template).

Have fun!
