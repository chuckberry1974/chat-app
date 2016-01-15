// login
      var lock = new Auth0Lock(
        'uCxiKiGA49tLe3f9iXNsBp2XdzvBzImZ',
           'zellwk.auth0.com'
      )
      // login
      document.querySelector('#login').addEventListener('click', function () {
          lock.show(function (err, profile, token) {
            if (err) {return console.error('Something went wrong: ', err)}

             else {
              window.localStorage.setItem('userToken', token);
              window.localStorage.setItem('profile', JSON.stringify(profile));

            var socket = io.connect('https://ga-webchat.herokuapp.com/', {
              'query': 'token=' + token
              })

            // socket.on('connected', function (message) {
            //     console.log(message)
            //   })
              $('form').submit(function (event) {
                event.preventDefault()
                console.log('testing');
                var timestamp = new Date()
                var username = JSON.parse(window.localStorage.getItem('profile')).name
                console.dir(username);
                 var message = {
                  username: username,
                  message: $('#m').val(),
                  timestamp: timestamp.toISOString()
                }

                 socket.emit('chat message', message)
                $('#m').val('')
                return false
              })

              socket.on('chat message', function (msg) {
                console.log(msg);
                $('#messages').append($('<li>').text(msg.message.slice(3, (msg.message.length - 4))))
                $('#messages').append($('<li>').text(new Date(msg.timestamp)))
              })
              }
            })
          })

        // Logout
      document.querySelector('#logout').addEventListener('click', function () {
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('profile')
        window.location.reload()
      })

      // To ensure that elements are ready on polyfilled browsers,
      // wait for WebComponentsReady.
      // document.addEventListener('WebComponentsReady', function() {
      //   var input = document.querySelector('paper-input');
      //   var button = document.querySelector('paper-button');
      //   var greeting = document.getElementById("greeting");
      //   button.addEventListener('click', function() {
      //     greeting.textContent = 'Hello, ' + input.value;
      //   });
      // });
