Accessibility in Practice
=========================

Contributing
------------

Clone the repository:

`git clone https://github.com/rpflorence/accessibility-in-practice.git`

Install dependencies, you will need [Node.js](http://nodejs.org).

`npm install`

Create a file in `demos/` that looks like this and fill it in:

```html
<title><!-- TEXT --></title>

<introduction><!-- HTML --></introduction>

<incorrect>
  <demo>
    <code>
      <!-- HTML - this will be rendered and displayed -->
    </code>
    <discussion>
      <!-- HTML -->
    </discussion>
  </demo>
  <!-- can have multiple demos -->
</incorrect>

<correct>
  <!-- same as incorrect -->
  <demo>
    <code></code>
    <discussion></discussion>
  </demo>
</correct>

<resources>
  <resource href="http://example.com" title="Title of link">
    <!-- TEXT: description of link -->
  </resource>
  <!-- can have multiple resources -->
</resources>

```

Build the page:

`npm run-script build`

License and Copyright
---------------------

MIT-Style license

&copy; 2014 Ryan Florence

