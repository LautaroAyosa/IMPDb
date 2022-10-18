# Welcome to IMPDb (Internet Movie-People Database)

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