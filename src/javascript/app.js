var $         = require('jquery')
var Game      = require('./game')
var Preview   = require('./preview')
var Freestyle = require('./freestyle')
var HandBell  = require('./lib/Handbell')
var Cookies   = require('./util/cookies')
var Shake     = require('shake');

var songSelect = function() {
  var $container = $('.song-list');
  var $songs     = $container.find('li');
  var $form      = $('form[action="/rooms"]');
  var $select    = $form.find('select[name="room[song]"]');
  var elItem     = document.querySelector('.-easter-egg-item')
  var elText     = document.querySelector('.easter-egg-text')

  var pickSong = function() {
    var $song = $(this);
    $song.addClass('-selected');
    var songName = $song.data('select');
    $select.val(songName);
    $form.submit();

    return false;
  }

  var addEvents = function() {
    $songs.on('click', pickSong);
    detectForEasterEgg();
  }

  var showEasterEgg = function() {
    elItem.classList.remove('-hidden')
    elText.classList.add('-hidden')
  }

  var detectForEasterEgg = function() {
    var shaker = new Shake()
    shaker.start()

    window.addEventListener('shake', showEasterEgg, false)
    elText.addEventListener('click', showEasterEgg, false)
  }

  return {
    init: function() {
      if($container.length > 0) {
        addEvents();
      }
    }
  }
}();

var instructScreen = function() {
  var $container      = $('.home');
  var $buttons        = $container.find('.actions .button');
  var $instructions   = $container.find('#instructions');
  var $instructButton = $instructions.find('.button');
  var toURL           = '';
  var cookieName      = 'jb_return_visit';

  var handBell = new HandBell('C4');

  var showInstructions = function() {
    $container.removeClass('home').addClass('instruct-screen');
  }

  var startSound = function() {
    handBell.initialize();
  }

  var setCookie = function() {
    Cookies.create(cookieName, true, 30);
  }

  var checkCookie = function(e) {
    if(Cookies.read(cookieName) == null) {
      startSound();
      toURL = $(this).attr('href');
      showInstructions();
      setCookie();
      e.preventDefault();
    }
  }

  var reroute = function() {
    window.location.replace(toURL);
  }

  var addEvents = function() {
    $buttons.on('click', checkCookie);
    $instructButton.on('click', reroute);
  }

  return {
    init: function() {
      if($buttons.length > 0) {
        addEvents();
      }
    }
  }
}();

songSelect.init();
instructScreen.init();


// js for freestyling
var freestyleNode = document.querySelector('.freestyle-note-button')
if (freestyleNode) new Freestyle()


// js for previewing songs in full
var previewNode = document.querySelector('#preview-room-info')
if (previewNode) new Preview(previewNode)


// Index page
// #TODO Add basic routing
var $roomLink = $('#room-link')
var $roomCode = $('.room-code')

$roomCode.on('input', function(e) {
  e.preventDefault()

  $roomLink.attr('href', '/' + $(this).val())
})


// Game page
var container = document.getElementById('game')
if (container) {
  window.game = new Game(container)
}
