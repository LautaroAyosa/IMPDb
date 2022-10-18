# Welcome to IMPDb (Internet Movie-People Database)

## Quick Start:
1. Download the repository. <br>
Go to the green "Code" button and select "Download Zip" or clone it with `$git clone https://github.com/LautaroAyosa/IMPDb.git`.
2. Run `$npm install` inside the folder `/api`.
3. Run `$npm run dev` inside the folder `/api` to start a dev server with nodemon.
4. Try the app! <br>
You can do that with an application like "Postman" making calls to the api, or with the files inside the folder `/api/request` by opening the files on "Visual Studio Code" and clicking "send request".

## Task:
Create the following models using Sequelize

### 1. Person
A person can have multiple roles in different movies (Actor/Actress, Director, Producer) and can have more than 1 rol in the same movie (Be an actor and director, for example).
```
Person: {
    -Id
    -Name
    -Last Name
    -Age
    -[Movies as Actor/Actress]
    -[Movies as Director]
    -[Movies as Producer]
}
```

### 2. Movie
```
Movie: {
    -Id
    -Title
    -Year
    -[Casting (Actors+Actresses]
    -[Directors]
    -[Producers]
}
```