<h1>Workable Spaces</h1>
<p><a href="https://warm-shore-19238.herokuapp.com/">Workable Spaces</a> is a responsive full-stack app. This app allows users to book a working space on an hourly basis.</p>
<img src="public/images/screenshot.png">

## Getting started
### Installing
```
>   git clone https://github.com/fedNinja/spaces.git
>   cd spaces
>   npm install
```
### Launching
```
>   npm start
```
Then open [`localhost:8000`](http://localhost:8000) in a browser.
### Testing
```
>   npm run test
```

<h2>Background</h2>
<p>I built this app because many enterpreneurs and small business owners cannot afford to lease a brick and mortar building. Being a resident of San Fransico, it is very expensive to lease a space or rent a brick and mortar. People will either not meet at all or find places like starbucks which does not have the kind of privacy they need. In such situations, workable spaces came as a rescuer.</p>

<h2>How it Works</h2>
<h3>Reserving a space</h3>
<p>User can search for available working spaces based on location and date. They can even see the details of the property with all the amenities. User can easily sign up/login to reserve the space. We never store any credit card information. Reserving the space is like a breeze with workable spaces.</p>

<h2>Wireframes</h2>
<p>Initial wireframes were created for each page. Mockups of all key processes were designed with user flow in mind.</p>
<img src="public/images/wirframes.png">

<h2>Technology</h2>
<h3>Front End</h3>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
  <li>jQuery</li>
</ul>
<h3>Back End</h3>
<ul>
  <li>Node.js + Express.js (web server)</li>
  <li>MongoDB (database)</li>
  <li><a href="https://mochajs.org/">Mocha</a> + <a href="http://chaijs.com/">Chai</a> (testing)</li>
  <li>Continuous integration and deployment with <a href="https://travis-ci.org/">Travis CI</a></li>
</ul>
<h3>Responsive</h3>
<ul>
  <li>The app is fully responsive and quickly adapts to all mobile, tablet, and desktop viewports.</li>
</ul>