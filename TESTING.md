# whack-a-mole - Testing

[Visit Live Site Here!](https://blingz-bbae80235bc4.herokuapp.com/)

[Main READ ME FILE Here](https://github.com/zaicodes/blingz-accessories)

I continuously tested and debugged my project using Chrome developer tools, ensuring proper functionality and responsiveness across various devices. I also utilized Google developer tools to verify different elements and troubleshoot any issues, specifically assessing JavaScript code sections for intended performance.

## Manual Testing

### Testing Client Goals Testing

| User story                                                                                                	| How was it achieved?                                                                                                                                                                                        	|
|-----------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
|                                                                                                           	|                                                                                                                                                                                                             	|
| First time visitors:                                                                                      	|                                                                                                                                                                                                             	|
| Easily navigate through the website which is responsive to  different screen sizes                        	| This was achieved by making the website fully responsive for  different screen sizes through effective CSS and media Query.                                                                                 	|
| See clear product page with high-quality images, pricing  and product description.                        	| Creating a shop page that consists of all products with clear names,  description, price and rating.                                                                                                        	|
| Easily create a user account to track orders                                                              	| Users can create a profile to checkout. There is a sign up page which  appears when the user clicks on sign up word on the login window.                                                                    	|
| Read reviews and ratings from other customers to make informed  purchasing desicions.                     	| There is a section on landing page which consists of testimonials  that the user can read.                                                                                                                  	|
|                                                                                                           	|                                                                                                                                                                                                             	|
| Returning visitors:                                                                                       	|                                                                                                                                                                                                             	|
| Log in quickly and securely using my existing credentials                                                 	| The user can log in to the account they created previously  via log-in window which is accessible by clicking on the  profile icon on the top of the page.                                                  	|
| Effortlessly add items to my shopping cart for a seamless  shopping experience                            	| Users can add any items from Shop that they want. Once the user  clicks on the cart icon, the item is added to their cart  which they can access it by clicking on the basket icon  on the top of the page. 	|
| Have the ability to update the cart, adjust quantities,  and remove items  before proceeding to checkout. 	|                                                                                                                                                                                                             	|
|                                                                                                           	|                                                                                                                                                                                                             	|
| Frequent visitors:                                                                                        	|                                                                                                                                                                                                             	|
| Have multiple ways for contacting customer support including  a contact form.                             	| There are number of ways which the user can get in touch, details  of email, number  and location are listed in contact us page. Users can also fill a  form to send a message  directly from the website.  	|
| Change my password and username easily from the account  settings page.                                   	| When the user is on their profile, they're able to update their  profile details such as username and password, which will be  updated from the database.                                                   	|
| Ability to delete my profile account.                                                                     	| The user is also able to delete their profile account too,  by simply clicking on the delete profile button found on  the profile page.                                                                     	|
|                                                                                                           	|                                                                                                                                                                                                             	|

### testing using other screen size devices and browsers

Thorough testing was performed on the following devices:

Laptop:

- HP Envy 360

Mobile Devices:

- iPhone 13 Pro
- Samsung Galaxy S23 Ultra

In addition, the website was tested on the following browsers:

- Google Chrome
- Safari
- Firefox

No problems were identified.

### Full testing

| Category        	| Features                                             	| Expected Outcome                                                                                                                                                                                                     	| Testing Performed                                                                                                                                                  	| Pass/Fail 	|
|-----------------	|------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------	|
| Navbar          	| Link in Logo                                         	| This logo should direct user back to the Home page  regardless of the page they're on                                                                                                                                	| Clicked on the logo                                                                                                                                                	| Pass✅     	|
|                 	| The pages                                            	| Each name of the four names on the the navbar  should directly take you to the page                                                                                                                                  	| Clicked on each one                                                                                                                                                	| Pass✅     	|
|                 	| Responsivness                                        	| The website is fully responsive towards different  screen sizes and devices                                                                                                                                          	| 1- Opened the website on different devices 2- Used the Google Chrome developer tools to  check responsiveness                                                      	| Pass✅     	|
|                 	| Profile/log-in icon  and Cart icon                   	| These icons should work once clicked on and should take the user  to the either log-in window or profile page  (depending on if the user is logged in or not) Similarly, the cart icon should open the cart/basket.  	| I clicked on profile icon and it opened the profile  or the log-in window depending on if I logged in. I also, clicked on the cart icon which  displayed the cart. 	| Pass✅     	|
|                 	| CTA button                                           	| This button attracts user to clicking on shop.  This should open the shop page.                                                                                                                                      	| Clicked on it and it opened the shop page.                                                                                                                         	| Pass✅     	|
|                 	|                                                      	|                                                                                                                                                                                                                      	|                                                                                                                                                                    	|           	|
| Sign-up/ log-in 	| Checking if username or  password are correct or not 	| If the user placed incorrect information, they will get an  alert to say incorrect username or password                                                                                                              	| I tried this functionality by putting wrong username  and/or password during the log-in process.                                                                   	| Pass✅     	|
|                 	| Confirm password                                     	| The password should match when signing up, if they don't then the user  gets an alert to inform them about it                                                                                                        	| I put two different password to check and it threw an alert  that the passwords don't match                                                                        	| Pass✅     	|
|                 	| Correct signup                                       	| If the user signs up, then they'll get an alert message for success  signup and will be prompted to login                                                                                                            	| I signed up by filling the sign up form, once it was done  I got an alert message.                                                                                 	| Pass✅     	|
|                 	| Correct login                                        	| if you're correctly logged-in, then you'll be redirected to profile page  which is only accessible when a user successfully logged-in                                                                                	| I logged in using the details I put during the sign up.  I was redirected to profile page.                                                                         	| Pass✅     	|
|                 	|                                                      	|                                                                                                                                                                                                                      	|                                                                                                                                                                    	|           	|
| Shop page       	| Hover effect                                         	| The items have hover effect to show the user which item they're hovering on.                                                                                                                                         	| Once placed the mouse above the items, they give hover effect.                                                                                                     	| Pass✅     	|
|                 	| Add to cart icon                                     	| The user can add any item they want to the cart/basket                                                                                                                                                               	| The user can click on the cart icon above each item to add it the cart.                                                                                            	| Pass✅     	|
|                 	|                                                      	|                                                                                                                                                                                                                      	|                                                                                                                                                                    	|           	|
| Footer          	| Pages links and being responsive                     	| The footer's links are working upon clicking on them, including pages and logo.  The footer is also responsive.                                                                                                      	| I clicked on all pages and the logo to see if they're directing me to the correct path. I also check the footer's responsiveness to different screen sizes.        	| Pass✅     	|
|                 	|                                                      	|                                                                                                                                                                                                                      	|                                                                                                                                                                    	|           	|


Contact form:
I conducted thorough testing on the contact form, both locally and on the published website, to verify its functionality. Testing included scenarios such as submitting the form with empty fields. The form consistently guided users to complete missing information, and use the @ symbol for email. Clear instructions were provided for missing or incomplete submissions, leading users to successfully submit the form. Upon successful submission, the form shows an alert to the users ensuring an instant confirmation.

## Automated Testing

### W3C Validator

I used [W3C](https://validator.w3.org/) to validate both the HTML and CSS on all pages of the website.

- HTML W3C Validator
Regarding the HTML Validator, it flagged information messages about trailing slashes on void elements, a result of the automatically added /> close tag by Prettier. 
Manual removal will be addressed in the next file save to rectify this issue.
it also flagged the flask related codes which was ignored.
other than that, there were no errors found.

![index.html]()

- CSS Validator (JigSaw)
The CSS Validator Jigsaw was used to validate all the CSS files. There were no errors found.
![style.css](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/jigsaw.png)

### JavaScript Validator

[JSLint](http://www.jslint.com/) was used to check for any errors in JavaScript code. There were none found.

### Lighthouse

Google's Lighthouse tool was used to test performance, accessibility, SEO,
and PWA aspects of the site. The results are as follow:

![Index.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/index.png)

![About.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/about.png)

![Contact.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/contact.png)

![Signup.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/signup.png)

![Profile.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/profile.png)

![Shop.html](https://github.com/zaicodes/blingz-accessories/blob/main/documentation/testing/about.png)


Issues found on Lighthouse:

- The contrast ratio between the background and foreground colours is inadequate, particularly with the dark pink text on a white page. This was ignored as these colours were part of colour palette for this project.

- Another concern was that the link tags lacked a distinguishable name. Despite adding "aria-label" to address this, the profile icon in the navbar also has "aria-hidden='true'." This adjustment is necessary to accommodate variations in the icon appearance for users who are logged in versus those who are not logged in.

## Bugs discovered

During development and deployment I noticed a few bugs that needed fixing.

### Solved bugs
- Lighthouse index.html > needed to give alt attributes to images in Testimonials, also needed to change the button that said SEE MORE into more specific name i.e. Our journey as it was too generic. 
- Lighthouse Contact.html > the iframe had no name so I gave it a title attribute of my-map and reduced the space between the iframe and the section title.
- Profile+cart icons were added to smaller screens by placing their icons in the middle of the navbar through css.
- Fixing the profile deleting functionality in database by incorporating the functionality within a form, using a button with name and value attributes, and ensures proper event handling by correctly invoking the confirmDeleteProfile function with parentheses in the onclick attribute.
- limited the python code to 79 ch. max, and added more comments to explain the code and functions further.
- Fixing add to cart functionality which wasn't working and not linking to profile. This was fixed by introducing a new /checkout route for handling the checkout process and streamlines the profile update logic by incorporating it into the existing /profile route.
- Added the missing alt attributes and title for better accessibility, resizing logo so it's more clear.
- Fixed error with config file which wasn't working on heroku. This was solved by changing the file name to env.py

### Tutor Feedback

Tutor feedback during the assessment helped identity few bugs:

- The "continue to checkout" button was not functional for non-logged-in users. This issue has been resolved by enabling the button to redirect users to the sign-up/login window, prompting them to either sign up or log in before proceeding to checkout.

- Additionally, there were problems with deleting and updating items in the data when the user is in their profile. This has been addressed by bringing up the cart window when the user attempts to edit or delete an item, and be able to do it from there. Changes made will reflect on the user's profile once they click checkout again.


### Unsolved bugs
- in the lighthouse, the accessibility scored 88% on some point, this was due to using aria-hidden on navbar icon to flexibly control it. Implementing aria hidden can enhance the accessibility of various elements, including decorative icons or images, which in my project's case was necessary.
