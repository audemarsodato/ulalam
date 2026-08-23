## Features

- [ ] Recipe Management
- [ ] Ingredient-Based Search
- [ ] User Authentication
- [ ] Meal Planner
- [ ] Cooking
- [ ] Specialties
- [ ] Cooking History
- [ ] Recipe Variations
- [ ] Social Features
- [ ] User Onboarding

## Scope
### In-scope
- [ ] Ulam management
- [ ] Social interactions
- [ ] Cooking
- [ ] History or cooking log
### Out-scope
- [ ] Whats in my fridge. Tracks your inventory and available ingredients
  - [ ] I can restock and update the inventory and logs the update with date
  - [ ] Inventory decreases when used and updates after ulam is cooked/ when im done cooking
  - [ ] I can edit and make corrections when the actual inventory is not aligned with whats in the app
  - [ ] Every changes is logged and has date and time of the update with proper log message
  - [ ] The app recommends ulam based on whats in my fridge as available ingredients

## Functional Requirements
### Recipe Management
- [x] Users can create and publish ulams
- [x] Users can edit an ulam of their own
- [x] Users can delete an ulam of their own
- [x] Users can upload a photo when creating or editing an ulam
- [x] Users can view the details of an ulam
### Ingredients based search
- [x] Users can search ulams using available ingredients
### Meal planner
- [x] Users can plan meals for up to next 7 days
- [x] Users can assign an ulam to a specific mealtime and date within the next 7 days
- [x] Users can update or remove assigned meals before their scheduled mealtime
- [ ] Users can rearrange planned meals using drag-and-drop.
### Cooking 
- [x] Users can cook ulams.
- [x] Users can cook an ulam one step at a time using next and previous navigation
- [ ] The application allows users to cook ulams with an interactive AI chat that guides them through each step
### Specialties
- [ ] Users earn a specialty after cooking the same ulam 8 or more times.
### Cooking history
- [x] Users can view their cooking history
- [ ] The application records each cooking session, including the ulam, date, and mealtime (breakfast, lunch, dinner)
- [ ] The application derives recently cooked ulams from the user's cooking history to help avoid repeating meals within the last 7 days.
### Recipe Variations
- [x] Users can create variations of ulams.
- [ ] Users cannot make a variation of an ulam that is already a variation
### Social features
- [x] Users can bookmark ulams
- [x] The application displays the latest ulams published by people the user follows in the feed
- [x] The application displays the user's recently cooked ulams
- [x] Users can browse ulams in their feed
- [x] Users can follow and unfollow each other
- [x] User profiles display specialties, followers, and following 
- [x] Users can like ulams.
- [x] Users can comment on ulams.
- [x] Users can search for other users
### User authentication
- [ ] The application allows users to create an account using a verified email
- [ ] The application allows users to sign in with Google or Apple
- [ ] Users can log in using their verified email and password
- [ ] Users can continue using the application as a guest.
- [ ] The application allows guest users to browse the feed and search ulams only
- [ ] Guest users cannot like, comment, bookmark, cook, or create variations of ulams
- [ ] The application prompts guest users to create an account or log in before performing restricted actions

### User onboarding
- [ ] Users can complete their profile after creating an account
- [ ] The application displays onboarding screens for first-time users.