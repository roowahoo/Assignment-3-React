https://hardcore-stonebraker-ed8b84.netlify.app/

# The Skin Shop
## Site Owner Goals
To create a platform where buyers can purchase skincare products from.

# User Stories
1. As a user, I want to be able to search for skincare products by categories, brands or skintype to find a product that will work for my skin.
2. As a user, I want a smooth checkout process where I am able to add items to cart and make payment easily.

# Scope
## Functional
1. User can register for an account and start adding items to the shopping bag and checkout.
2. User can update their profile details.
3. User can view items that have been added to the bag and see the total amount of the items.
4. User can search for products by product category, brand and skintype.

## Non-Functional
1. Mobile Responsiveness

# Information Architecture
## Content Inventory
1. Product image, name, brand, description and price in the shop.
2. Shopper profile.
3. Shopper's bag items.

# Interaction Design
1. Understandability: Forms have clear input titles and actions of buttons are straightforward.
2. Learnability: Navigation links are positioned at the top where users are familiar with and are consistent throughout the pages. Cursors change on links on hover to indicate that it is clickable.
3. Operability: 
- Links to stripe payment are working
- Alert prompts user to login when accessing protected pages
- Alert notifies users of incorrect email or password in login
4. Attractiveness
- Margin and padding are present to improve readability
- Layput changes according to screen size

# Structure
## Logical Schema Diagram
![Logical Schema Diagram](images/logical_schema_diagram.png)

# Surface
## Visual Design
1. Colour theme of app go well together and are easy on the eyes
2. Fonts are readable and easy on the eyes

# Features
## Registration
Users can register for an account and start shopping
## Profile
Users can edit their profile information such as address, username or password
## Search 
Users can search for products by brand, skintype or category
## Bag
User can add items to bag and go to their bag to see all items as well as change the quantity of items.

# Technologies
[Gitpod](www.gitpod.io) was the coding platform used.  

[GitHub](github.com) was used for repositories.

[Bootstrap] (https://getbootstrap.com/docs/5.0/getting-started/introduction/) was used for alignment.

[Reactstrap](https://reactstrap.github.io/components/form/) was used for navbar.

[Stripes](https://stripe.com/en-sg) was used to process payment.

# Testing
## Test that user can register for an account
1. Click on 'register'.
2. Fill in the form and click register
3. Go to profile to view created profile and go to bag to start adding items to bag.

## Test adding products to bag
1. Go to shop
2. Click 'add to bag' for product of choice
3. Click on bag icon on top right to find all items that have been added to bag.

## Test product search form
1. Select one input field and click 'search'
2. Products will be filtered by search query below.

## Test checkout and payment
1. Click on bag icon to go to shopping bag
2. Enter shipping dettails
3. Click 'checkout'
4. Check details and click 'pay' once confirmed
5. User will be brought to Stripes checkout page

# Deployment
Hosting Platform: Netlify
Database platform: PostgreSQL and deployed to Heroku
Database connection platform: DBeaver

# Credits
[Canva](www.canva.com) was used for creating the logo.

[Google fonts](https://fonts.google.com/) was used to import fonts.

[Paul's Github](https://github.com/kunxin-chor?tab=repositories) was used as reference to recreate code that has been taught in class.

[Stack Overflow](https://stackoverflow.com/) was used for debugging help.

[Wishtrend] (https://www.wishtrend.com/category/skincare/) was source to creating mock products in shop.




