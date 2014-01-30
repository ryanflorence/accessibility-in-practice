Accessibility Antipatterns
==========================

Contributing
------------

Clone the repository:

`git clone https://github.com/rpflorence/accessibility-demos.git`

Create a file in `demos/` that looks like this:

```html
<title>Title of your pattern</title>

<intro>
  <!-- html to introduce the subject -->
</intro>

<incorrect>
  <demo>
    <!-- code in here will get displayed and rendered -->
  </demo>

  <description>
    <!-- HTML describing the incorrect demo -->
  </description>
</incorrect>

<correct>
  <demo>
    <!-- code in here will get displayed and rendered -->
  </demo>

  <description>
    <!-- HTML describing the correct demo -->
  </description>
</section>
```

Build the page:

`npm run-script build`

License and Copyright
---------------------

MIT-Style license

&copy 2014 Ryan Florence

