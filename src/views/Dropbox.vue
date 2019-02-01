<template>
  <div class="container main">

    <div
      id="authed-section"
      v-if="authed"
    >
      <p>You have successfully authenticated. Below are the contents of your root directory. They were fetched using the SDK and access token.</p>
      <ul id="files"></ul>
    </div>
    <div
      id="pre-auth-section"
      v-else
    >
      <p>This example takes the user through Dropbox's API OAuth flow using <code>Dropbox.getAuthenticationUrl()</code> method [<a href="http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#getAuthenticationUrl">docs</a>] and then uses the generated access token to list the contents of their root directory.</p>
      <v-text-field
        v-model="access_token"
        type="text"
      />
      <a
        href=""
        id="authlink"
        class="button"
      >Authenticate</a>
      <p class="info">Once authenticated, it will use the access token to list the files in your root directory.</p>
    </div>

  </div>
</template>

<script>
import Dropbox from "dropbox";

export default {
  data() {
    return {
      authed: false,
      access_token: ""
    };
  },
  methods: {
    isAuthenticated() {
      return !!this.getAccessTokenFromUrl();
    },
    getAccessTokenFromUrl() {
      return this.access_token;
      //return utils.parseQueryString(window.location.hash).access_token;
    }
  },
  created() {
    var dbx = new Dropbox.Dropbox({
      accessToken: this.access_token
    });
    dbx
      .filesListFolder({ path: "" })
      .then(function(response) {
        renderItems(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });

    var CLIENT_ID = "6n0h9a8lwo6iunr";
    // Parses the url and gets the access token if it is in the urls hash

    // If the user was just redirected from authenticating, the urls hash will
    // contain the access token.

    // Render a list of items to #files
    function renderItems(items) {
      console.log(items);
      /* var filesContainer = document.getElementById("files");
      items.forEach(function(item) {
        var li = document.createElement("li");
        li.innerHTML = item.name;
        filesContainer.appendChild(li);
      }); */
    }
    // This example keeps both the authenticate and non-authenticated setions
    // in the DOM and uses this function to show/hide the correct section.
    /* function showPageSection(elementId) {
      document.getElementById(elementId).style.display = "block";
    }
    if (this.isAuthenticated()) {
      //showPageSection("authed-section");
      this.authed = true;
      // Create an instance of Dropbox with the access token and use it to
      // fetch and render the files in the users root directory.
      var dbx = new Dropbox.Dropbox({
        accessToken: this.getAccessTokenFromUrl()
      });
      dbx
        .filesListFolder({ path: "" })
        .then(function(response) {
          renderItems(response.entries);
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      //showPageSection("pre-auth-section");
      this.authed = false;
      // Set the login anchors href using dbx.getAuthenticationUrl()
      var dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });
      var authUrl = dbx.getAuthenticationUrl("http://localhost:8080/#/dropbox");
      console.log(authUrl);
      //var authUrl = dbx.getAuthenticationUrl("http://localhost:8080/auth");
      //document.getElementById("authlink").href = authUrl;
    } */
  }
};
</script>

<style>
</style>
