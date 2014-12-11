/**
 * @jsx React.DOM
 */

var React = require('react')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      played : false,
      note   : null,
      beat   : null
    }
  },

  componentDidMount: function() {
    this.setState({
      note : this.props.note,
      beat : this.props.beat
    })
  },

  percentageOffset: function() {
    return (this.props.difference / this.props.timeWindowInMilliseconds ) * 100
  },

  top: function() {
    return -this.percentageOffset()
  },

  noteContent: function() {
    var note       = this.props.note
    var typeOfNote = note === this.props.playerNote ? 'player-note' : 'other-note'
    var className  = 'type-' + note + ' ' + typeOfNote + (this.props.alt ? ' -alt' : '');

    if (note) {
      return (
        <figure className={className}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 74" enable-background="new 0 0 74 74">
            <path fill="#fff" d="M59.8 26.5c-.1-.3-.2-.7-.4-1 0 0 0 .1-.1-.1v-.1l-.1-.2V25l-.1-.2-.1-.3c-.7-1.5-1.7-2.7-2.8-3.7-1.1-1-2.2-1.8-3.3-2.5-1.1-.7-2.1-1.2-3.1-1.7s-1.9-1-2.7-1.4c-1.7-.9-3-1.8-4-2.8-1.1-1.1-1.9-2.4-2.6-4.2-.7-1.8-1.5-5.4-1.9-6S37.4 1 36.6 1c-1.3 0-2.4 1.1-2.4 2.4V54c-3.1-1.4-7.2-1.5-11.3.2-6.5 2.7-10.2 8.8-8.2 13.6 2 4.9 8.9 6.6 15.4 4 5-2.1 8.3-6.1 8.7-10.1.1-.2.1-.5.1-.7V19.8c1.2 1.2 2.4 2.1 3.6 2.9 1.1.7 2.1 1.2 3.1 1.8 1 .5 1.9 1 2.7 1.4 1.7.9 2.8 1.8 3.5 2.6h.1l.1.1.1.2.1.1v-.1c.1.2.2.3.3.5.2.4.4.7.6 1.1l.9 2.4c.9 3.4.6 7.7-.7 12.1 1.1-.6 2-1.4 2.8-2.3.8-.9 1.6-1.9 2.2-2.9 1.3-2.1 2.1-4.6 2.3-7.3.1-1.3 0-2.7-.2-4.1-.2-.4-.3-1.1-.6-1.8z" />
          </svg>
        </figure>
      )
    }
  },

  render: function() {
    var beat = this.props.beat
    var style = {
      WebkitTransform : 'translateY(' + this.top() + '%)',
      MozTransform    : 'translateY(' + this.top() + '%)',
      Transform       : 'translateY(' + this.top() + '%)'
    }

    return (
      <li className={'beat-' + beat} style={style}>
        { this.noteContent() }
      </li>
    )
  }

})
