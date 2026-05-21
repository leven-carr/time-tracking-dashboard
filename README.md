# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

Setup steps: Create an assets folder to contain images, css, js, and data. Link the favicon, Google font, and styles.css in the head. Include the script tag in the head with a defer attribute. Write the custom variables and the universal reset in styles.css.

Working on the HTML: Create a main element to hold the content with a class of flex-container to be used to center it on the page. Create an h1 element and give it a class of sr-only, so that it will be completely invisible on the page but still present for accessibility purposes. Create a ul element with a class of grid-container and an id of tracker-grid; this will hold all of the cards/widgets in the tracker:

- Create an li element with classes of flex-container and stack. This first li will hold the profile card (contains an img and an h2 with a span nested inside it) and the card for the timeframe toggles (contains 3 button elements). This second card, div.btn-wrapper, must also be given an id of btn-wrapper. Each of the buttons must be given a data-timeframe attribute, with the corresponding timeframe as its value (ie, daily, weekly, monthly).
- At this point, for the static version of the site I hardcoded in each individual widget. However, when I wrote the JS I removed these widgets and instead created a template element:
  - Create a template element with an id of widget-template. Nested within it, create an li with class="flex-container stack clearable". The li has two direct children; the first is an empty div with class="card underlay" and aria-hidden="true". This first div is simply for decorative purposes; we will use CSS to give it the correct appearance. The second direct child of the li is a div with class="flex-container card widget". It has two children: div.flex-container.widget-header (holds an h3.widget-title and an img for the ellipses icon) and div.flex-container.widget-content (holds p.current and p.previous). The actual textContent of all the elements in the template is left blank, to be filled in via JS.

Styling: After the resets, write the starting styles for the body and main elements. Then do some utility classes: .sr-only as well as .grid-container and .flex-container defaults. From there, move onto styling the elements. Some specific rules of note included setting a z-index of 1 on the profile card, so that it would overlay the btn-wrapper card; and setting the first direct child of each li.stack to have a negative margin-bottom in order to scoot the next card up and create the overlap effect. The .underlay cards were targeted as a group for their width, size, background-repeat, and background-position, and then targeted individually to apply the specific background-color and background-image to each one (two of them also had their own background-position set just because their icons didn't fit quite as well with the default style I had set). Next are the hover states and the .selected state for the active button. Lastly are the media queries, which mostly consisted of changing the grid's template and width, with some element's getting an increased font size as well.

JavaScript: Initiate a variable, activities, that will hold the json data. Also initiate variables trackerGrid and btnWrapper to hold their respective DOM elements. Next, write a function definition that will be used to initiate the app. This is an asynchronous function that awaits the response from the data being fetched, and places that data in the global activities variable. The function then invokes another function, updateTracker, with "weekly" passed in as the argument. Outside the populateUI function definition, we define the updateTracker function, which takes in a timeframe as its parameter. The first thing updateTracker does it to call toggleBtn, which takes in as its argument the button whose data-timeframe attribute matches the given timeframe from updateTracker. Then updateTracker moves on to creating the actual widgets. It does this by calling the forEach method on activities. For each activity, it accesses the template from our HTML, clones it, then moves down the template filling in the necessary class and textContent:

- Find the element with the class of "underlay" within the template clone, access its classList, and add to that classList the value of the current activity's title property, which first has any spaces replaced with empty strings (ie, gets rid of any spaces; this was necessary to prevent a bug with "Self Care") and is converted to lowercase.
- Find the h3 element with the class of "widget-title" within the clone and set its textContent to the value of the current activity's title property.
- Find the p element with the class of "current" within the clone and place it in a variable curTime. Set the textContent of curTime to the correct time, which we get by traversing from the current activity object > its timeframe property, which is itself an object > the timeframe object's current property > that value is the desired textContent. This is within a template literal string also containing "hr". After that is an if statement that checks to see if the current time value is not equal to 1, in which case it invokes pluralizeHr with curTime passed in as its argument; pluralizeHr works by taking in an element, accessing its textContent, and concatenating an "s" to that string.
- The next step works largely the same way as the current time step, however it uses a switch statement to account for the different words needed depending on the timeframe. After the switch statement, it uses pluralizeHr as well.
- Finally, the completed widget is appended to the DOM inside trackerGrid.

Following that function definition, we define a couple helper functions including pluralizeHr (see above), clearTracker, and toggleSelected. clearTracker accesses a node list of all the elements inside trackerGrid that have a class of "clearable", that is, all the activity widgets. It then loops through that list and removes each widget from the DOM. toggleSelected takes in a btn; it works by searching the btnWrapper element for an element with a class of selected, then if it finds one (see the optional chaining syntax ?.) it accesses its classList and removes selected from it. Then it adds selected to the classList of whichever button was passed in.
At this point in the script we invoke populateTracker() to initialize the app. Below that, there is a click event listener on btnWrapper, that checks to make sure the event was fired by one of the buttons (rather than just the wrapper itself), then runs clearTracker and updateTracker, with the clicked button's timeframe passed in as its argument.

### Built with

HTML, CSS, and vanilla JS

### What I learned

There were a lot of new things I learned in this project. I had a vague understanding of the fetch API beforehand, but this was the first time I had used it in practice without following a tutorial. I also learned about template elements, which I had never used before, as well as the JS method .cloneNode. From what I understand, importNode is the preferred method when cloning fragments across different documents, whereas cloneNode is fine for cloning fragments in one document, and even that distinction is historical. Because I was working just within one document, and because cloneNode has slightly less wordy syntax, I opted to use cloneNode instead of importNode. Other than that, I also learned the optional chaining syntax `?.` which I used to prevent a bug where I was getting an error from attempting to access the classList of null, which happened when toggleSelected was unable to find a button that already had the class "selected".

Aside from the things that were brand new to me, this project was a challenging, good learning experience across the board. It sharpened my grid skills (I haven't used grid very often), and had several hiccups that I had to debug. The earliest was a CSS issue; I had initially tried to create the activity widget underlays using the ::before pseudo-element, but that was a nightmare when I tried to format the wider version of the grid, so I went back and created actual elements but gave them aria-hidden="true" so that they wouldn't give screenreaders unnecessary fluff. Ultimately, while I was hesitant about putting unnecessary, decorative elements in the DOM, I do feel like the resulting HTML made more sense than what I had initially tried to do. There were also a lot of small quirks I had to work out in the JS, including the aforementioned bugs where the Self Care widget wasn't generating correctly because of the space, and where toggleSelected was causing an error due to it attempting to access classList on null in its initial call. I also had a lot of trouble figuring out how to pass in the button correctly when toggleSelected was called, because I needed to pass in the parent function's argument as the data-timeframe value of a querySelected button...etc etc. It worked once I realized I needed to use a template literal.

### Continued development

In the future I want to get better about writing code that finds a good balance of using utility styles for certain things, particularly flexboxes, to keep layout styles more independent of more decorative, element-specific styles such as font-size, color, etc.

I also want to get better at writing concise JS. I don't know whether my JS file is a reasonable length for this type of project, or if it came out exceedingly verbose. Along with that, I want to continue learning more about best practices for production-ready JS, as I sometimes struggle to move from isolated syntactic exercises to real-world use cases.

Eventually for another challenge I would be interested in refactoring this to actually be a functional app, where a user could visit the site and input their own data.

### Useful resources

- [MDN - Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) - Helpful for getting a quick understanding of the syntax for a simple fetch request.
- [MDN template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) - Definitely contained some information that went over my head, but was helpful for learning how to use a template element. I still had to look up a couple things, ie, where to place the template in the HTML, whether to use cloneNode or importNode (I went with cloneNode instead of importNode despite MDN's recommendation).

## Author

- Frontend Mentor - [@leven-carr](https://www.frontendmentor.io/profile/leven-carr)
- GitHub - [@leven-carr](https://github.com/leven-carr)
