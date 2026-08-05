## Schemas
  - Ulam
    - id: db generated
    - title: str
    - ingredients: array
    - steps: array
    - photoUrl: str
    - owner: userId
    - likedBy: array of user ids who liked it (count this to get the number of likes)
    - comments: array (for scalability, use a seperate collection for comments)
      - (id)
      - (ulamId)
      - userId
      - comment
      - createdAt
    - varationOf: ulam_id or null (if original) (use this detail to find the variations of this ulam, Ulam.find({variationOf: currentUlam._id})) (if not null, can not create a variation)
    - number of cooks: int
  - User
    - id: db generated
    - email: str
    - password: str
    - Followers: array of user ids: str
    - Following: array of user ids: str
    - Earned Specialties: array of object that contains ulam_id earned in repeated cooking and timesCooked derived from counting how many times the ulamm has appeared in the history of the user, updating the timesCooked also must be derived from the history (cached data)
  - Cooking history
    - id: db generated
    - owner: str (user id)
    - Date: date (timestamp)
    - Mealtime: str (breakfast, lunch, dinner)
    - Ulam: str (ulam id)
    - Ulams cooked in the last 7 days (cooking history object property: get by filtering history)
  - Meal plan
    - id: db generated
    - owner: str (user id)
    - ulam: str (ulam id)
    - date: date
    - mealtime: str (breakfast, lunch, dinner)

## Pages
  - [x] Home 
  - [x] Add ulam 
  - [x] Search ulam
  - [x] Update / edits ulam
  - [x] Ulam profile details
  - [x] Create ulam variation
  - Bookmarks
  - [x] Meal plan
  - [x] Cook ulam
  - [x] History of cooked ulam
  - Sign up
  - Complete your profile
  - Onboarding
  - Log in
  - [x] User profile
    - Followed people (Child page, seperate page but can only be accesed through the parent page)
    - Followers

## Page Contents
### Home
    - Header with user profile pic and ulalam at the center in the same line as profile pic
    - Greetings to the user, Good morning, Audemars
    - Search bar that redirects to search page
    - Previously cooked / "You cooked" and link to History (View full history)
    - Your specialties, if empty, prompt user (Cook more ulams to earn specialties.)
    - Latest from people you follow
### Add ulam 
    - Header has a arrow left button to go back and a title Add ulam
    - label Ulam name, then text input
    - label Photo, then upload file box with label (restaurant icon) Add a photo
    - label Ingredients, then text input and add button
    - Then display added ingredients as chips with x button inside them
    - lebel Instructions, then a textarea for instructions
    - Then Add Ulam button
### Update / edits ulam 
    - Same content as the add ulam but make the title to edit ulam
    - Add ulam to Save Changes, clicking will update the ulam
    - Fields are prefilled for the editing ulam
### Search ulam
    - Header has an arrow left button to go back and a title search
    - input search and search button
    - options like radiobutton that user can choose to search, one for ulam and one for people
    - if ulams, container for ingredients chips
    - Search result container
    - Ulam card like like in people you follow for ulam search result
    - People / user card that contains their profile pic, name ,,, similar to ulam card 
### Ulam profile details
    - Header with only back button at the left and bookmark button at the right and overflow menu that contains edit and delete ulam if own ulam
    - The ulams picture
    - The name of the ulam
    - The profile pic then name of the owner below the name of the ulam, clicking will redirect to the user's profile
    - Heart button at the right side of the ulam name and owners name
    - Statistics showing the number of likes, cooks, and bookmarks using icons
    - Ingredients section using chips for each ingredient
    - A section instructions
    - Ulam cards of the ulams variations and a button for create variation
    - Comments at the bottom
    - A cook button at the bottom of the screen fixed position, clicking will display a modal that prompts the user to choose mode, cook or cook with AI
### Create ulam variation
    - Same content as the add ulam but make the title to Create Variation
    - Add ulam to Publish Variation, clicking create a new ulam and with variationOf: originalUlamId
    - Fields are prefilled with the parent ulams detailed
    - ulam photo default to the parent ulams photo
### Cook ulam
    - Cook (Multi-step page)
      - Step 1: Introduction
        - Header with back button and a progress indicator at the middle
        - Ulam name
        - prompt to ask if the user is ready tp cook (Ready to cook?)
        - Next button
      - Step 2: Ingredients
        - Header with back button and a progress indicator at the middle
        - Ingredient checklist
        - prompt the user (Ingredients ready?)
        - Previous button at the bottom left and Next button at the right
      - Step 3: Steps
        - Header with back button and a progress indicator at the middle
        - prompt user to do the next step (Next step or lets continue)
        - Display one instruction at a time
        - Previous button at the bottom left and Next button at the right
      - Step 4: Finish
        - Header with back button and a progress indicator at the middle
        - Congratulation message (Enjoy your ulam! plate emoji)
        - Completion message (You've successfully cooked Ulam Name)
        - Finish button, clicking will 
          - add the ulam to cooking history and 
          - increment the ulams numberOfCooks and 
          - check if the user have reached specialty level and 
            - initiate celebration animation of confetti and modal and 
              - Header of New Specialty Mastered with confetti emoji at the beggining
              - Message of "You've mastered this ulam by cooking it 8 times"
              - And nother line "It has been added to your Specialties"
              - button for Awasome, clicking will exit the modal and redirect to feed
            - skip if not
    - Cook with Ai (Single page like chat app)
      - Header with go back button and a title of Cook with AI
      - Container for chat messages
        - Message chip distuingishable for ai and user
      - Line for Quick replies chips above the message input and send button
        - `Done`, `Next step`, `Repeat`
      - Input text for message input and send button using icon
### History of cooked ulam
    - Header with go back button and a title of Cooking History
    - Display the users 9 recently cooked ulams using ulam cards and seperate them with the date (Today, Yesterday, Monday, Tuesday, ...)
    - message Load More at the bottom of the ulams, clicking will load and display more of the history (pagination)
### Meal plan
    - Header with back button and the title "Meal Planner"
    - Horizontal weekday navigation (Mon, Tue, Wed, Thu, Fri, Sat, Sun) with the date below each day
      - Clicking a day scrolls to that day's section
      - Current day is highlighted
    - Display the next 7 days
      - Day title (TODAY, TOMMOROW, MONDAY, ...) and then the Date (MAR 2)
      - Planned meals using Ulam Cards
        - Mealtime displayed inside the card below the ulam title with bold text and color for highlight
        - Delete icon button at the right (or overflow menu with change and delete options)
        - Supports drag-and-drop to rearrange meal times or move to another day
      - "Add Meal" button at the bottom of each day, clicking will display modal
        - Title "Add meal"
        - Choose meal time using radio buttons (Breakfast, lunch, dinner)
        - Search input and search button, typing will actively search and display results
        - Search results using ulam cards
        - cancell button and add button
### Create account
    - Welcome message
    - Create account header
    - Email input
    - password input
    - confirm password
    - Signup button
    - Already have an account? Login
    - Continue with google button
    - Continue as guest
### Complete your profile
    - Header complete your profile
    - Profile picture preview, also stands as a upload file button when clicked (optional)
    - Required username input
    - Continue button
### Onboarding (Sliding pages)
    - each page has their own image illustrations
    - a skip button at the top right corner
    - previous button at the bottom right and next button at the left side and progress indicator in the middle of them
    - Page 1: Publish and discover ulams
    - Page 2: Plan your meals ahead
    - Page 3: Cook with AI
    - Last page has only get started button
### Log in
    - Welcome back message
    - Login header
    - Email input
    - password input
    - login button
    - Dont have an account? Signup
    - Continue with google button
    - Continue as guest
### User profile
    - Header has an arrow left button to go back and a title of profile
    - Profile picture that can be changed
    - The users username
    - Following and count, clicking will redirect to following page
    - Followers and count, clicking will redirect to followers people
    - Edit profile if own profile or follow button if not
    - Specialties section
    - Published ulam section
    - if own profile, show bookmarks and cooking history, and log out

- Color theme
  - Red
  - Orange
  - Pinterest

Ulam
        - Title
        - Ingredients
        - Instructions
        - Picture
  

  - Components
    - Modal that takes children as a prompt, You can reuse the modal since you can declare the content of the modal in the call


IN CSS
- Parent should be responsible with the layout of its children