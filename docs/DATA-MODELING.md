# Data Models

## Ulam
- name: str
- imageURL: str
- ingredients: arr
- instructions: arr
- owner: id{user}
- likedBy: arr[user: id]
- bookmarkedBy: arr[user: id]
- variationOf: id[ulam] | null
- numOfCooks: int

## User
- username: str
- email: str
- passwordHashed: str
- followers: arr[user: id]
- followings: arr[user: id]
- earnedSpecialties: arr[ulam: id] (timesCooked is derived from cookinglog counting how many times the ulam appeared in the history)

## Cooking Log
- ulam: id
- user: id
- createdAt: date
- mealtime: str (derived from timestamp, mealtime zones, backend job)

## Meal plan
- ulam: id
- user: id
- date: date (user input)
- mealtime: str (user input)

## Comment
- ulam: id
- user: id
- content: string
- createdAt: date

## ERD
https://www.drawdb.app/editor/diagrams/f08c8df0-39de-4980-b5ed-52c0f3e37f4d