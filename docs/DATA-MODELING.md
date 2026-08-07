# Data Models

## Ulam
- name: str
- imageURL: str
- ingredients: arr
- instructions: arr
- owner: id
- likedBy: arr[user: id]
- bookmarkedBy: arr[user: id]
- variationOf: id
- numOfCooks: int

## User
- username: str
- email: str
- passwordHashed: str
- followers: arr
- followings: arr
- earnedSpecialties: arr

## Cooking Log
- ulam: id
- user: id
- date: date
- mealtime: str

## Meal plan
- ulam: id
- user: id
- date: date
- mealtime: str

## Comment
- ulam: id
- user: id
- content: string
- createdAt: date